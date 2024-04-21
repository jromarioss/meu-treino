import { Image } from 'expo-image';
import { Alert, Image as Image2 } from 'react-native';
import { Container, ButtonClose, Main, Title, AreaImage, Form, Input, LabelText, LabelArea, ButtonFinish, ButtonFinishtxt, LabelStrongText } from './styled';
import { useEffect, useState } from 'react';
import { exercisesInfoProps } from '../../../../interfaces/exerciseDetailsProps';
import { exerciseDetails } from '../../../../utils/exerciseDetails';
import { exerciseTypesProps } from '../../../../interfaces/exerciseProps';

import CloseImg from '../../../../assets/closeBack.png';
import { exercisesProps } from '../../../../interfaces/divisionProps';

interface ModalExerciseProps {
  exercise: exerciseTypesProps | null,
  onExercise: (value: exercisesProps) => void,
  onClose: () => void,
}
/* parei na parte do modal de criar o exercisio e salva */
export const ModalExercise = ({ exercise, onExercise, onClose }: ModalExerciseProps) => {
  const [exerciseInfo, setExerciseInfo] = useState<exercisesInfoProps | null | undefined>(null);
  const [serieTxt, setSerieTxt] = useState<string>('');
  const [repetitionTxt, setRepetitionTxt] = useState<string>('');
  const [load, setLoad] = useState<boolean>(false);

  const fetchExercise = () => {
    setLoad(true);

    const findExerciseType = exerciseDetails.find(item => item.type === exercise?.type);
    const findExerciseInfo = findExerciseType?.exercises.find(item => item.title === exercise?.exercise);
    setExerciseInfo(findExerciseInfo);

    setLoad(false);
  }


  const handleAddExercise = () => {
    if (serieTxt === '' || repetitionTxt === '') {
      return Alert.alert('Error', 'Informe o número de serie e de repetição.');
    }

    if (exercise) {
      const newExercise: exercisesProps = {
        type: exercise?.type,
        title: exercise?.exercise,
        series: parseInt(serieTxt),
        repetition: parseInt(repetitionTxt),
      }
      onExercise(newExercise);
      handleCloseModal();
    }
  }

  const handleCloseModal = () => {
    onClose();
  }

  useEffect(() => {
    fetchExercise();
  }, []);
  return (
    <Container>
      <ButtonClose onPress={handleCloseModal}>
        <Image2
          source={CloseImg}
        />
      </ButtonClose>

      <Main>
        <Title>{exercise?.exercise}</Title>

        <AreaImage>
          {exerciseInfo?.image &&
            <Image
              source={exerciseInfo?.image}
              contentFit='cover'
              style={{ width: '100%', height: '100%' }}
            />
          }
        </AreaImage>

        <Form>
          <LabelArea>
            <LabelText>Serie</LabelText>
            <Input
              keyboardType='number-pad'
              onChangeText={setSerieTxt}
              value={serieTxt}
              maxLength={2}
            />
          </LabelArea>
          
          <LabelArea>
            <LabelText>Repetição</LabelText>
            <Input
              keyboardType='number-pad'
              onChangeText={setRepetitionTxt}
              value={repetitionTxt}
              maxLength={2}
            />
          </LabelArea>
        </Form>

        <LabelText>Deseja adicionar <LabelStrongText>{exercise?.exercise}</LabelStrongText> na divisão <LabelStrongText>{exercise?.type}</LabelStrongText></LabelText>

        <ButtonFinish onPress={handleAddExercise}>
          <ButtonFinishtxt>Adicionar</ButtonFinishtxt>
        </ButtonFinish>
      </Main>
    </Container>
  );
}