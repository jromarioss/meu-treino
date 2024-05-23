import { useContext, useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container, Main, Text } from '../../components';

import { trainingStorageDTO, trainingGetAll } from '../../storage';
import { AppError } from '../../utils';

import { ButtonTraining, EmptyArea } from './styled';

export const MyExercise = () => {
  const { navigate } = useNavigation();

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
        Alert.alert('Deletar treino', error.message);
      } else {
        Alert.alert('Deletar treino', 'Não foi possível deletar o traino.');
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
    <Container titleText='Meu treino'>
      <Main>
        <FlatList
          data={trainings}
          extraData={(item: trainingStorageDTO) => item}
          renderItem={({ item }) => (
            <ButtonTraining onPress={() => handleGoToMyExerciseOpen(item.name)}>
              <Text text={item.name} fs={24} nol={1} />
            </ButtonTraining>
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