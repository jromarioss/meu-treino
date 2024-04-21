import { Container, Input, LabelText, Form, InfoText, Main, ButtonClose, ButtonNext, ButtonNextTxt } from './styled';
import CloseImg from '../../../../assets/closeBack.png';
import { Alert, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { AppError } from '../../../../utils/appError';
import dayjs from 'dayjs';
import { trainingStorageDTO } from '../../../../storage/training/trainingStorageDTO';
import { trainingCreate } from '../../../../storage/training/trainingCreate';

interface modalTrainingCreateProps {
  onOpenAndClose: () => void,
  onNameTraining: (name: string) => void;
}

export const ModalTrainingCreate = ({ onOpenAndClose, onNameTraining }: modalTrainingCreateProps) => {
  const [nameTraining, setNameTraining] = useState<string>('');
  const [blockBtnNext, setBlockBtnNext] = useState<boolean>(false);

  const handleCloseModal = () => {
    onOpenAndClose();
  }

  const handleCreateNameExercise = async () => {
    try {
      const newDate = dayjs(new Date()).format('DD/MM/YYYY');

      const newTraining: trainingStorageDTO = {
        name: nameTraining,
        createdAt: newDate
      }

      await trainingCreate(newTraining);

      onNameTraining(newTraining.name);
      handleCloseModal();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo traino', error.message);
      } else {
        Alert.alert('Novo traino', 'Não foi possível criar o traino.');
      }
    }
  }

  useEffect(() => {
    if (nameTraining.trim().length === 0) {
      setBlockBtnNext(true);
    } else {
      setBlockBtnNext(false);
    }
  }, [nameTraining, setBlockBtnNext]);

  return (
    <Container>
      <ButtonClose onPress={handleCloseModal}>
        <Image source={CloseImg} />
      </ButtonClose>
      <Main>
        <Form>
          <LabelText>Nome do treino</LabelText>
          <Input
            onChangeText={setNameTraining}
            value={nameTraining}
            maxLength={32}
          />
        </Form>
        <InfoText>Um treino possui nome e suas divisões, para criar seu treino dê um nome a ele no campo acima e clique em próximo!</InfoText>

        <ButtonNext onPress={handleCreateNameExercise} disabled={blockBtnNext}>
          <ButtonNextTxt>Próximo</ButtonNextTxt>
        </ButtonNext>
      </Main>
    </Container>
  );
}