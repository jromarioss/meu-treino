import { Container } from './styled';
import { Header } from '../../components/Header';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';
import { GymContext } from '../../context/gymContext';
import { trainingStorageDTO } from '../../storage/training/trainingStorageDTO';
import { trainingGetAll } from '../../storage/training/trainingGetAll';
import { trainingToRemove } from '../../storage/training/trainingToRemove';

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
      //await trainingToRemove('Treino A');
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