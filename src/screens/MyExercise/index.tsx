import { useContext, useEffect, useState } from 'react';
import { Text, FlatList } from 'react-native';

import { Container } from '../../components';

import { trainingStorageDTO } from '../../storage/training/trainingStorageDTO';
import { trainingGetAll } from '../../storage/training/trainingGetAll';
import AsyncStorae from '@react-native-async-storage/async-storage';
import { trainingToRemove } from '../../storage/training/trainingToRemove';
import { TRAINING_COLLECTION } from '../../storage/storageConfig';

import { Main } from './styled';

export const MyExercise = () => {

  const [trainings, setTrainings] = useState<trainingStorageDTO[] | null>([]);
  const [load, setLoad] = useState<boolean>(false);

  const fetchTraining = async () => {
    try {
      setLoad(true);

      const data = await trainingGetAll();
      setTrainings(data);
      //await AsyncStorae.removeItem(TRAINING_COLLECTION);
      setLoad(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTraining();
  }, [])

  return (
    <Container titleText='Meu treino'>
      <Main>
        <FlatList
          data={trainings}
          extraData={(item: trainingStorageDTO) => item}
          renderItem={({ item }) => (
            <Text style={{ color: 'white'}}>{item.name}</Text>
          )}
        />
      </Main>
    </Container>
  );
}