import { Container } from './styled';
import { Header } from '../../components/Header';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';
import { GymContext } from '../../context/gymContext';
import { trainingStorageDTO } from '../../storage/training/trainingStorageDTO';
import { trainingGetAll } from '../../storage/training/trainingGetAll';
import AsyncStorae from '@react-native-async-storage/async-storage';
import { trainingToRemove } from '../../storage/training/trainingToRemove';
import { TRAINING_COLLECTION } from '../../storage/storageConfig';

export const MyExercise = () => {
  const { showMenu } = useContext(GymContext);

  const [training, setTraining] = useState<trainingStorageDTO[] | null>([]);
  const [load, setLoad] = useState<boolean>(false);

  const fetchTraining = async () => {
    try {
      setLoad(true);

      const data = await trainingGetAll();
      //setTraining(data);

      console.log('data: ', data)
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
    <Container>
      <Header title='Meu Treino' />
      {showMenu && <Menu />}
    </Container>
  )
}