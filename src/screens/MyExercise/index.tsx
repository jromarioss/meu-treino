import { useContext, useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';

import { Container, Main, Text } from '../../components';

import { trainingStorageDTO, trainingGetAll } from '../../storage';
import { AppError } from '../../utils';

import { ButtonTraining } from './styled';

export const MyExercise = () => {
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
            <ButtonTraining>
              <Text text={item.name} fs={24} nol={1} />
            </ButtonTraining>
          )}
        />
      </Main>
    </Container>
  );
}