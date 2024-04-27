import { Image } from 'expo-image';
import { Alert, FlatList, Image as Image2, Text, View } from 'react-native';
import { Container, ButtonClose, ExerciseDiv, ExerciseBtDelete, ExerciseText, Main, Title, AreaImage, Form, Input, LabelText, LabelArea, ButtonFinish, ButtonFinishtxt, LabelStrongText } from './styled';
import { useEffect, useState } from 'react';
import { exercisesInfoProps } from '../../../../interfaces/exerciseDetailsProps';
import { exerciseDetails } from '../../../../utils/exerciseDetails';
import { exerciseTypesProps } from '../../../../interfaces/exerciseProps';
import TrashImg from '../../../../assets/trashBlack.png';
import CloseImg from '../../../../assets/closeBack.png';
import { exercisesProps } from '../../../../interfaces/divisionProps';

interface ModalExerciseProps {
  exercise: exerciseTypesProps | null,
  exercises: exercisesProps[],
  deleteExercise: boolean,
  onExercise: (value: exercisesProps) => void,
  onClose: () => void,
  onDeleteExercise: (value: string) => void,
}
/* parei na parte do modal de criar o exercisio e salva */
export const ModalExercise = ({ exercise, exercises, deleteExercise, onExercise, onClose, onDeleteExercise }: ModalExerciseProps) => {
  const [exerciseInfo, setExerciseInfo] = useState<exercisesInfoProps | null | undefined>(null);
  const [serieTxt, setSerieTxt] = useState<string>('');
  const [exercisesaName, setExercisesName] = useState<string[]>([]);
  const [repetitionTxt, setRepetitionTxt] = useState<string>('');

  const fetchExercise = () => {
    if (!deleteExercise) {
      const findExerciseType = exerciseDetails.find(item => item.type === exercise?.type);
      const findExerciseInfo = findExerciseType?.exercises.find(item => item.title === exercise?.exercise);
      setExerciseInfo(findExerciseInfo);
    } else {
      setExercisesName([]);
      const exercisesToAdd = exercises.map(exercise => exercise.title);
      setExercisesName(exercisesToAdd);
    }
  }

  const handleAddExercise = () => {
    const series = serieTxt.replace(/[,.]/g, '');
    const repetitions = repetitionTxt.replace(/[,.]/g, '');

    if (series === '' || repetitions === '') {
      return Alert.alert('Error', 'Informe o número de serie e de repetição.');
    }

    if (parseInt(series) > 10 || parseInt(repetitions) > 20) {
      return Alert.alert('Error', 'Valor máximo para serie é 10 e repetição é 20.');
    }

    if (exercise) {
      const newExercise: exercisesProps = {
        type: exercise?.type,
        title: exercise?.exercise,
        series: parseInt(series),
        repetition: parseInt(repetitions),
      }
      onExercise(newExercise);
      handleCloseModal();
    }
  }

  const handleDeleteExercise = (value: string) => {
    onDeleteExercise(value);
  }

  const handleCloseModal = () => {
    onClose();
  }

  useEffect(() => {
    fetchExercise();
  }, []);

  useEffect(() => {
    fetchExercise();
  }, [exercises]);

  return (
    <Container>
      <ButtonClose onPress={handleCloseModal}>
        <Image2
          source={CloseImg}
        />
      </ButtonClose>

      <Main>
        {!deleteExercise ?
          <>
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
          </>
          :
          <>
            <Title>Exercícios</Title>

            <View>
              <FlatList
                data={exercisesaName}      
                extraData={(item: string) => item}
                renderItem={({ item }) => (
                  <ExerciseDiv>
                    <ExerciseText numberOfLines={1}>{item}</ExerciseText>

                    <ExerciseBtDelete onPress={() => handleDeleteExercise(item)}>
                      <Image
                        source={TrashImg}
                        contentFit='cover'
                        style={{ width: 28, height: 28 }}
                      />
                    </ExerciseBtDelete>
                  </ExerciseDiv>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </>
        }
      </Main>
    </Container>
  );
}