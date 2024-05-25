import { Alert } from 'react-native';
import {  useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';

import { Container} from '../../components/Container';
import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { ButtonCreate } from '../../components/ButtonCreate';
import { Input } from '../../components/Input';
import { ButtonDelete } from '../../components/ButtonDelete';
import { Loading } from '../../components/Loading';

import { useGym } from '../../hooks/useGym';
import { AppError } from '../../utils/appError';
import { trainingToRemove } from '../../storage/training/trainingToRemove';
import { trainingGeByName } from '../../storage/training/trainingGetByName';
import { trainingStorageDTO } from '../../storage/training/trainingStorageDTO';

import { TrainingDiv, Div, ButtonTraining, AreaInput } from './styled';
import { trainingCreate, trainingGetAll } from '../../storage';

export const CreateTraining = () => {
  const _gym = useGym();
  const { navigate } = useNavigation();

  const [training, setTraining] = useState<trainingStorageDTO | null>(null);
  const [nameTraining, setNameTraining] = useState<string>('');
  const [showInfosToCreate, setShowInfosToCreate] = useState<boolean>(true);
  const [load, setLoad] = useState<boolean>(false);

  const fetchName = async (nameToFind: string) => {
    try {
      setLoad(true);
      //Busca o nome que acabou de criar
      const data = await trainingGeByName(nameToFind);
      setTraining(data);
      //E mostra o nome
      setLoad(false);
      setShowInfosToCreate(false);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Não foi possível encontrar este treino.');
      }
    } finally {
      setLoad(false);
    }
  }

  const handleSaveName = async () => {
    try {
      //Verifica se o nome ta vazio
      if (nameTraining === '') {
        return Alert.alert('Error', 'Seu treino precisa ter um nome.');
      }
      //Formata o nome e a data
      const nameFormated = nameTraining.trim();
      const newDate = dayjs(new Date()).format('DD/MM/YYYY');
      //Prepara o obj
      const newTraining: trainingStorageDTO = {
        createdAt: newDate,
        name: nameFormated,
      }
      //Busca os treinos para ver se já criou 6
      const allTraining = await trainingGetAll()

      if (allTraining.length > 5) {
        return Alert.alert('Error', 'Só pode ser criado no máximo 6 treinos.');
      }
      //Salva no contexto e o nome no celular
      _gym.onSetTrainingName(nameFormated);
      await trainingCreate(newTraining);
      //Reseta o input e mostra o treino
      setNameTraining('');
      fetchName(nameFormated);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Não foi possível criar um treino.');
      }
    }
  }

  const deleteTraining = async () => {
    try {
      if (training !== null) {
        //deleta no celular o treino
        await trainingToRemove(training.name);
        //Reseta o treino e mostra as infos para criar outro treino
        setShowInfosToCreate(true);
        setTraining(null);
      }
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Deletar treino', error.message);
      } else {
        Alert.alert('Deletar treino', 'Não foi possível deletar o traino.');
      }
    }
  }

  const handleDeleteTraining = async () => {
    Alert.alert('Deletar treino', 'Deseja deletar este treino?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => deleteTraining() }
    ]);
  }

  const handleGoToCreateDivision = () => {
    _gym.onCleanDivisionDatas();
    _gym.onCleanDoubtType();
    navigate('createDivision');
  }

  useEffect(() => {
    _gym.onSetDoubtType('Create training');
  }, []);

  return load ?
    <Loading />
    :
    <Container titleText='Criar Treino' doubt>
      <Main gap={16} ai='center' jc='space-between'>
        {showInfosToCreate ?
          <AreaInput>
            <Text text='Informe um nome para o seu treino.' fs={18} cl={_gym.COLORS.GRAY_100} />
            <Input
              fs={18} bg={_gym.COLORS.GRAY_100} h={42} w='100%' br={4} pl={16}
              onChangeText={setNameTraining}
              value={nameTraining}
              maxLength={30}
            />
          </AreaInput>
          :
          <Div>
            <TrainingDiv>
              <ButtonTraining onPress={handleGoToCreateDivision}>
                <Text text={training?.name} fs={24} cl={_gym.COLORS.GRAY_100} nol={1} />
              </ButtonTraining>
              <Text text={training?.createdAt} fs={16} cl={_gym.COLORS.GRAY_100} />
            </TrainingDiv>

            <ButtonDelete
              h={36} w={36} ic='white' ih={16} iw={16} bg={_gym.COLORS.RED_600}
              onPress={handleDeleteTraining}
            />
          </Div>
        }
        
        {showInfosToCreate &&
          <ButtonCreate
            bg={_gym.COLORS.GREEN_600} fs={32} fw={700}
            text='Salvar'
            onPress={handleSaveName}
          />
        }
      </Main>
    </Container>
}