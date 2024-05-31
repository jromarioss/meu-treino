import { Image } from 'expo-image';
import { Alert, FlatList } from 'react-native';
import { useEffect, useState } from 'react';

import { Main } from '../../../../components/Main';
import { Text } from '../../../../components/Text';
import { Input } from '../../../../components/Input';
import { Loading } from '../../../../components/Loading';
import { ButtonCustom } from '../../../../components/ButtonCustom';
import { ButtonCreate } from '../../../../components/ButtonCreate';
import { ButtonCloseModal } from '../../../../components/ButtonCloseModal';

import { exercisesInfoProps } from '../../../../interfaces/exerciseDetailsProps';
import { exerciseDetails } from '../../../../utils/exerciseDetails';
import { exerciseTypesProps } from '../../../../interfaces/exerciseProps';
import { useGym } from '../../../../hooks/useGym';
import { exercisesProps } from '../../../../interfaces/divisionProps';

import { Container, AreaFlat, ExerciseDiv, AreaImage, Form, LabelArea } from './styled';

interface ModalExerciseProps {
  exercise: exerciseTypesProps | null,
  exercises: exercisesProps[],
  deleteExercise: boolean,
  onExercise: (value: exercisesProps) => void,
  onClose: () => void,
  onDeleteExercise: (value: string) => void,
}

export const ModalExercise = ({ exercise, exercises, deleteExercise, onExercise, onClose, onDeleteExercise }: ModalExerciseProps) => {
  const _gym = useGym();

  const [exerciseInfo, setExerciseInfo] = useState<exercisesInfoProps | null | undefined>(null);
  const [serieTxt, setSerieTxt] = useState<string>('');
  const [exercisesaName, setExercisesName] = useState<string[]>([]);
  const [repetitionTxt, setRepetitionTxt] = useState<string>('');
  const [load, setLoad] = useState<boolean>(false);

  const fetchExercise = () => {
    if (!deleteExercise) {
      setLoad(true);

      const findExerciseType = exerciseDetails.find(item => item.type === exercise?.type);
      const findExerciseInfo = findExerciseType?.exercises.find(item => item.title === exercise?.exercise);
      setExerciseInfo(findExerciseInfo);

      setLoad(false);
    } else {
      setLoad(true);
      
      setExercisesName([]);
      const exercisesToAdd = exercises.map(exercise => exercise.title);
      setExercisesName(exercisesToAdd);

      setLoad(false);
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
        done: false
      }

      onExercise(newExercise);
      onClose();
    }
  }

  const handleDeleteExercise = (value: string) => {
    onDeleteExercise(value);
  }

  useEffect(() => {
    fetchExercise();
  }, []);

  useEffect(() => {
    fetchExercise();
  }, [exercises]);

  return load ?
    <Loading />
    :
    <Container>
      <ButtonCloseModal t={1} r={1} cl={'black'} onPress={onClose} />

      <Main jc='space-between' ai='center' pd={0} >
        {!deleteExercise ?
          <>
            <Text text={exercise?.exercise} mt={20} ta='center' fs={18} fw={700} cl={_gym.COLORS.GRAY_800} />

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
                <Text text='Serie' fs={18} cl={_gym.COLORS.GRAY_800} />
                <Input
                  br={6} pl={12} h={44} fs={20} bw={1} bc={_gym.COLORS.GRAY_800}
                  keyboardType='number-pad'
                  onChangeText={setSerieTxt}
                  value={serieTxt}
                  maxLength={2}
                />
              </LabelArea>
              
              <LabelArea>
                <Text text='Repetição' fs={18} cl={_gym.COLORS.GRAY_800} />
                <Input
                  br={6} pl={12} h={42} fs={20} bw={1} bc={_gym.COLORS.GRAY_800}
                  keyboardType='number-pad'
                  onChangeText={setRepetitionTxt}
                  value={repetitionTxt}
                  maxLength={2}
                />
              </LabelArea>
            </Form>

            <ButtonCreate
              bg={_gym.COLORS.GREEN_600} h={54} fs={32} fw={700}
              text='Adicionar'
              onPress={handleAddExercise}
            />
          </>
          :
          <>
            <Text text='Exercícios' fs={18} fw={700} cl={_gym.COLORS.GRAY_800} />

            <AreaFlat>
              <FlatList
                data={exercisesaName}      
                extraData={(item: string) => item}
                renderItem={({ item }) => (
                  <ExerciseDiv>
                    <Text text={item} fs={16} cl={_gym.COLORS.GRAY_800} nol={1} fx1={1} />

                    <ButtonCustom
                      w={32} h ={32} ih={18} iw={18} ic='white' bg={_gym.COLORS.RED_500}
                      onPress={() => handleDeleteExercise(item)}
                    />
                  </ExerciseDiv>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </AreaFlat>
          </>
        }
      </Main>
    </Container>
}