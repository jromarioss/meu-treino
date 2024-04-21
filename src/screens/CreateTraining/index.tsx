import { ButtonCreate, ButtonCreateTxt, ButtonDelete, TrainingDiv, ButtonTrainingTxt, Container, Div, Main, TrainingArea, TrainingTxt, DataTxt, ButtonTraining, Text } from './styled';
import { Header } from '../../components/Header';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';
import { GymContext } from '../../context/gymContext';
import { ModalTrainingCreate } from './components/ModalTrainingCreate';
import { trainingStorageDTO } from '../../storage/training/trainingStorageDTO';
import { trainingGeByName } from '../../storage/training/trainingGetByName';
import { Image } from 'expo-image';
import TrashImg from '../../assets/trashWhite.png';
import { AppError } from '../../utils/appError';
import { Alert } from 'react-native';
import { trainingToRemove } from '../../storage/training/trainingToRemove';
import { useNavigation } from '@react-navigation/native';

export const CreateTraining = () => {
  const { showMenu } = useContext(GymContext);
  const nagivate = useNavigation();

  const [trainingName, setTrainingName] = useState<string>('');
  const [training, setTraining] = useState<trainingStorageDTO | null>(null);
  const [modalCreateExercise, setModalCreateExercise] = useState<boolean>(false);
  const [blockBtnCreate, setBlockBtnCreate] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);

  const findName = async (name: string) => {
    try {
      setLoad(true);

      setTrainingName(name);
      const data = await trainingGeByName(name);
      setTraining(data);

      setLoad(false);
    } catch (error) {
      
    }
  }

  const deleteTraining = async () => {
    try {
      setLoad(true);

      if (training?.name) {
        await trainingToRemove(training.name);
        Alert.alert('Deletar treino', 'Treino deletado com sucesso.');
        setTraining(null);
      }

      setLoad(false);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Deletar treino', error.message);
      } else {
        Alert.alert('Deletar treino', 'Não foi possível deletar o traino.');
      }
    }
  }

  const handleDeleteTraining = async () => {
    Alert.alert('Deletar traino', 'Deseja deletar este treino?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => deleteTraining() }
    ]);
  }

  const handleGoToCreateExercise = () => {
    nagivate.navigate('createDivision', { trainingName: trainingName })
  }

  const handleOpenModalCreateExercise = () => {
    setBlockBtnCreate(true);
    setModalCreateExercise(true);
  }

  const handleCloseModalCreate = () => {
    setBlockBtnCreate(false);
    setModalCreateExercise(false);
  }  

  return (
    <Container>
      <Header title='Criar treino' />
      {showMenu && <Menu />}

      <Main>
        {modalCreateExercise ?
          <ModalTrainingCreate
            onOpenAndClose={handleCloseModalCreate}
            onNameTraining={findName}
          />
          :
          <TrainingArea>
            {training != null ?
              <>
                <Div>
                  <TrainingDiv>
                    <ButtonTraining onPress={handleGoToCreateExercise}>
                      <ButtonTrainingTxt numberOfLines={1}>{training?.name}</ButtonTrainingTxt>
                    </ButtonTraining>
                    <DataTxt>{training?.createdAt}</DataTxt>
                  </TrainingDiv>

                  <ButtonDelete onPress={handleDeleteTraining}>
                    <Image
                      source={TrashImg}
                      contentFit='cover'
                      style={{ width: 24, height: 24 }}
                    />
                  </ButtonDelete>
                </Div>
                <Text>1. Agora clique no nome do treino que você criou para criar uma divisão, e na divisão você pode criar exercícios.</Text>
                <Text>2. Divisões são como exercícios, exemplo divisão de perna, nessa divisão terá os exercícios de perna.</Text>
                <Text>3. Caso deseje deletar o treino basta clica na lixeira.</Text>
              </>
              :
              <TrainingTxt>Clique em Criar para criar um treino.</TrainingTxt>
            }
          </TrainingArea>
        }

        <ButtonCreate onPress={handleOpenModalCreateExercise} disabled={blockBtnCreate}>
          <ButtonCreateTxt>Criar</ButtonCreateTxt>
        </ButtonCreate>
      </Main>
    </Container>
  );
}