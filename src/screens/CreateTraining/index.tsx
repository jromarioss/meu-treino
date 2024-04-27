import { Alert } from 'react-native';
import {  useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Container, ButtonCreate, Text, ButtonDelete, Loading } from '../../components';

import { useGym } from '../../hooks/useGym';
import { AppError } from '../../utils/appError';
import { trainingToRemove } from '../../storage/training/trainingToRemove';
import { trainingGeByName } from '../../storage/training/trainingGetByName';
import { trainingStorageDTO } from '../../storage/training/trainingStorageDTO';

import { TrainingDiv, Div, Main, TrainingArea, ButtonTraining } from './styled';
import { theme } from '../../styles/theme';

interface RouteParamsProps {
  name: string,
}

export const CreateTraining = () => {
  const _gym = useGym();
  const { COLORS } = theme;
  const { navigate } = useNavigation();
  const route = useRoute();
  const { name } = route.params as RouteParamsProps;

  const [training, setTraining] = useState<trainingStorageDTO | null>(null);
  const [blockBtnCreate, setBlockBtnCreate] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);

  const fetchName = async () => {
    try {
      setLoad(true);

      let hasThisName = '';

      if (name) {
        hasThisName = name
      } else {
        hasThisName = _gym.trainingName
      }

      const data = await trainingGeByName(hasThisName);
      setTraining(data);

      setLoad(false);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Não foi possível encontrar este traino.');
      }
    } finally {
      setLoad(false);
    }
  }

  const deleteTraining = async () => {
    try {
      if (training !== null) {
        await trainingToRemove(training.name);
        Alert.alert('Deletar treino', 'Treino deletado com sucesso.');
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
    navigate('createDivision', {});
    _gym.onCleanDoubtType();
  }

  const handleGoToCreateTrainingName = () => {
    navigate('createTrainingName');
  }

  useEffect(() => {
    _gym.onSetDoubtType('Create training');
  }, []);

  useEffect(() => {
    if (name || _gym.trainingName) {
      fetchName();
    }
  }, [name, _gym.trainingName]);

  useEffect(() => {
    if (training != null) {
      setBlockBtnCreate(true);
    } else {
      setBlockBtnCreate(false);
    }
  }, [training, setBlockBtnCreate]);

  return load ?
    <Loading />
    :
    <Container titleText='Criar Treino' doubt>
      <Main>
        <TrainingArea>
          {training != null &&
            <Div>
              <TrainingDiv>
                <ButtonTraining onPress={handleGoToCreateDivision}>
                  <Text text={training?.name} fs={24} cl={COLORS.GRAY_100} nol={1} />
                </ButtonTraining>
                <Text text={training?.createdAt} fs={16} cl={COLORS.GRAY_100} />
              </TrainingDiv>

              <ButtonDelete op={handleDeleteTraining} h={36} w={36} ic='white' ih={16} iw={16} bg={COLORS.RED_600} />
            </Div>
          }
        </TrainingArea>

        <ButtonCreate
          text='Criar'
          bg={COLORS.GREEN_600}
          fs={32}
          fw={700}
          op={handleGoToCreateTrainingName}
          ds={blockBtnCreate}
        />
      </Main>
    </Container>
}