import { useContext, useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container} from '../../components/Container';
import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { ButtonDelete } from '../../components/ButtonDelete';

import { trainingStorageDTO, trainingGetAll, exerciseRemoveByTraining, trainingToRemove } from '../../storage';
import { useGym } from '../../hooks/useGym';
import { AppError } from '../../utils';

import { ButtonTraining, EmptyArea, ButtonArea } from './styled';

export const MyExercise = () => {
  const { navigate } = useNavigation();
  const _gym = useGym();

  const [trainings, setTrainings] = useState<trainingStorageDTO[] | null>([]);
  const [load, setLoad] = useState<boolean>(false);

  const fetchTraining = async () => {
    try {
      setLoad(true);

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

  useEffect(() => {
    fetchTraining();
  }, []);

  return (
    <Container titleText={`${(trainings?.length ?? 0) <= 1 ? 'Meu treino' : 'Meus treinos'}`}>
      <Main>
        <FlatList
          data={trainings}
          extraData={(item: trainingStorageDTO) => item}
          renderItem={({ item }) => (
            <ButtonArea>
              <ButtonTraining onPress={() => handleGoToMyExerciseOpen(item.name)}>
                <Text text={item.name} fs={24} nol={1} />
              </ButtonTraining>

                <ButtonDelete
                  h={36} w={36} ih={16} iw={16}
                  ic='white'
                  onPress={() => handleDeleteTraining(item.name)}
                  bg={_gym.COLORS.RED_600}
                />
            </ButtonArea>
          )}
          
          ListEmptyComponent={() => (
            <EmptyArea>
              <Text text="Nenhum treino cadastrardo!" fs={24} nol={1} />
            </EmptyArea>
          )}
        />
      </Main>
    </Container>
  );
}