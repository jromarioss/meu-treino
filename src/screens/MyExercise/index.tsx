import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { Loading } from '../../components/Loading';
import { Container} from '../../components/Container';
import { ButtonCustom } from '../../components/ButtonCustom';

import { useGym } from '../../hooks/useGym';
import { AppError } from '../../utils';
import { trainingStorageDTO, trainingGetAll, exerciseRemoveByTraining, trainingToRemove } from '../../storage';

import { ButtonTraining, EmptyArea, ButtonArea, Div } from './styled';

export const MyExercise = () => {
  const { navigate } = useNavigation();
  const _gym = useGym();

  const [trainings, setTrainings] = useState<trainingStorageDTO[]>([]);
  const [load, setLoad] = useState<boolean>(false);

  const fetchTraining = async () => {
    try {
      setLoad(true);

      _gym.onCleanMyDivisionsShow();
      _gym.onCleanTrainingName();

      const data = await trainingGetAll();
      setTrainings(data);

      setLoad(false);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Não foi possível carregar o traino.');
      }
    }
  }

  const handleDeleteTraining = (nameToDelete: string) => {
    Alert.alert('Excluir', `Deseja excluir o treino ${nameToDelete}?`,[
      { text: 'Não', style: 'cancel'},
      { text: 'Sim', onPress: () => deleteTrainingAndDivisions(nameToDelete) }
    ]);
  }

  const deleteTrainingAndDivisions = async (nameToDelete: string) => {
    try {
      await exerciseRemoveByTraining(nameToDelete);
      await trainingToRemove(nameToDelete);

      fetchTraining();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Não foi possível deletar o treino.');
      }
    }
  }

  const handleGoToMyExerciseOpen = (trainingName: string) => {
    navigate('myExerciseOpen', { trainingName: trainingName });
  }

  const handleGoToEditExercise = (trainingName: string) => {
    _gym.onSetTrainingName(trainingName);
    navigate('myExerciseEdit');
  }

  useEffect(() => {
    fetchTraining();
  }, []);

  return load ?
    <Loading />
    :
    <Container titleText={`${trainings.length <= 1 ? 'Meu treino' : 'Meus treinos'}`}>
      <Main>
        {trainings.length > 0 ?
          <Div>
            {trainings.map((item: trainingStorageDTO, index: number) => {
              return (
                <ButtonArea key={index}>
                  <ButtonTraining onPress={() => handleGoToMyExerciseOpen(item.name)}>
                    <Text text={item.name} fs={24} nol={1} />
                    <Text text={item.createdAt} fs={12} />
                  </ButtonTraining>

                  <ButtonCustom
                    h={36} w={36} ih={16} iw={16}
                    ic='white' ei
                    onPress={() => handleGoToEditExercise(item.name)}
                    bg={_gym.COLORS.BLUE_600}
                  />

                  <ButtonCustom
                    h={36} w={36} ih={16} iw={16}
                    ic='white'
                    onPress={() => handleDeleteTraining(item.name)}
                    bg={_gym.COLORS.RED_600}
                  />
                </ButtonArea>
              )
            })}
          </Div>
          :
          <EmptyArea>
            <Text text="Nenhum treino cadastrardo!" fs={24} nol={1} />
          </EmptyArea>
        }
      </Main>
    </Container>
}