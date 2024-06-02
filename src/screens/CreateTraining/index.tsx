import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

import { Container} from '../../components/Container';
import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { ButtonCreate } from '../../components/ButtonCreate';
import { Input } from '../../components/Input';
import { ButtonCustom } from '../../components/ButtonCustom';
import { Loading } from '../../components/Loading';

import { useGym } from '../../hooks/useGym';
import { AppError } from '../../utils/appError';
import { trainingCreate, trainingGetAll } from '../../storage';
import { trainingToRemove } from '../../storage/training/trainingToRemove';
import { trainingGeByName } from '../../storage/training/trainingGetByName';
import { trainingStorageDTO } from '../../storage/training/trainingStorageDTO';

import { TrainingDiv, Div, ButtonTraining, AreaInput } from './styled';

interface formData {
  nameTraining: string;
}

export const CreateTraining = () => {
  const _gym = useGym();
  const { navigate } = useNavigation();

  const { control, handleSubmit, reset } = useForm<formData>({
    defaultValues: {
      nameTraining: ''
    }
  });

  const [training, setTraining] = useState<trainingStorageDTO | null>(null);
  const [showInfosToCreate, setShowInfosToCreate] = useState<boolean>(true);
  const [load, setLoad] = useState<boolean>(false);

  const fetchName = async (nameToFind: string) => {
    try {
      setLoad(true);

      const data: trainingStorageDTO | null = await trainingGeByName(nameToFind);
      setTraining(data);

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

  const handleSaveName = async ({ nameTraining }: formData) => {
    try {
      const nameFormated: string = nameTraining.trim();
      const newDate: string = dayjs(new Date()).format('DD/MM/YYYY');

      const newTraining: trainingStorageDTO = {
        createdAt: newDate,
        name: nameFormated,
      }
    
      const allTraining: trainingStorageDTO[] = await trainingGetAll()

      if (allTraining.length > 5) {
        return Alert.alert('Error', 'Só pode ser criado no máximo 6 treinos.');
      }

      _gym.onSetTrainingName(nameFormated);
      await trainingCreate(newTraining);

      reset();
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
        await trainingToRemove(training.name);

        setShowInfosToCreate(true);
        setTraining(null);
      }
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Deletar treino', error.message);
      } else {
        Alert.alert('Deletar treino', 'Não foi possível deletar este treino.');
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
            <Controller
              control={control}
              rules={{
                required: true
              }}
              name='nameTraining'
              render={({ field: { onChange, value }}) => (
                <Input
                  fs={18} bg={_gym.COLORS.GRAY_100} h={42} w='100%' br={4} pl={16}
                  onChangeText={onChange}
                  value={value}
                  maxLength={18}
                  onSubmitEditing={handleSubmit(handleSaveName)}
                />
              )}
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

            <ButtonCustom
              h={36} w={36} ic='white' ih={16} iw={16} bg={_gym.COLORS.RED_600}
              onPress={handleDeleteTraining}
            />
          </Div>
        }
        
        {showInfosToCreate &&
          <ButtonCreate
            bg={_gym.COLORS.GREEN_700}
            text='Salvar'
            onPress={handleSubmit(handleSaveName)}
          />
        }
      </Main>
    </Container>
}