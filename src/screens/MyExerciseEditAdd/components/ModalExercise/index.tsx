import { Image } from 'expo-image';
import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Main } from '../../../../components/Main';
import { Text } from '../../../../components/Text';
import { Input } from '../../../../components/Input';
import { Loading } from '../../../../components/Loading';
import { ButtonCreate } from '../../../../components/ButtonCreate';
import { ButtonCloseModal } from '../../../../components/ButtonCloseModal';

import { exercisesInfoProps } from '../../../../interfaces/exerciseDetailsProps';
import { exerciseDetails } from '../../../../utils/exerciseDetails';
import { exerciseTypesProps } from '../../../../interfaces/exerciseProps';
import { useGym } from '../../../../hooks/useGym';
import { exercisesProps } from '../../../../interfaces/divisionProps';

import { Container, AreaImage, Form, LabelArea } from './styled';

interface ModalExerciseProps {
  exercise: exerciseTypesProps | null,
  onExercise: (value: exercisesProps) => void,
  onClose: () => void,
}

interface formData {
  serieTxt: string;
  repetitionTxt: string;
}

export const ModalExercise = ({ exercise, onExercise, onClose }: ModalExerciseProps) => {
  const _gym = useGym();

  const [exerciseInfo, setExerciseInfo] = useState<exercisesInfoProps | null | undefined>(null);
  const [load, setLoad] = useState<boolean>(false);

  const { control, handleSubmit, reset } = useForm<formData>({
    defaultValues: {
      repetitionTxt: '',
      serieTxt: ''
    }
  });

  const fetchExercise = () => {
    setLoad(true);

    const findExerciseType = exerciseDetails.find(item => item.type === exercise?.type);
    const findExerciseInfo = findExerciseType?.exercises.find(item => item.title === exercise?.exercise);
    setExerciseInfo(findExerciseInfo);

    setLoad(false);
  }

  const handleAddExercise = ({ repetitionTxt, serieTxt }: formData) => {
    const series = serieTxt.replace(/[,.]/g, '');
    const repetitions = repetitionTxt.replace(/[,.]/g, '');

    if (parseInt(series) <= 0 || parseInt(repetitions) <= 0) {
      return Alert.alert('Error', 'Valor minímo para serie e repetição é 1.');
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
      reset();
    }
  }

  useEffect(() => {
    fetchExercise();
  }, []);

  return load ?
    <Loading />
    :
    <Container>
      <ButtonCloseModal t={1} r={1} cl={'black'} onPress={onClose} />

      <Main jc='space-between' ai='center' pd={0} >
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
            <Controller
              control={control}
              name='serieTxt'
              rules={{
                required: true
              }}
              render={({ field: { onChange, value }}) => (
                <Input
                    br={6} pl={12} h={44} fs={20} bw={1} bc={_gym.COLORS.GRAY_800}
                    keyboardType='number-pad'
                    onChangeText={onChange}
                    value={value}
                    maxLength={2}
                  />
              )}
            />
          </LabelArea>
          
          <LabelArea>
            <Text text='Repetição' fs={18} cl={_gym.COLORS.GRAY_800} />
            <Controller
              control={control}
              name='repetitionTxt'
              rules={{
                required: true
              }}
              render={({ field: { onChange, value }}) => (
                <Input
                  br={6} pl={12} h={42} fs={20} bw={1} bc={_gym.COLORS.GRAY_800}
                  keyboardType='number-pad'
                  onChangeText={onChange}
                  value={value}
                  maxLength={2}
                />
              )}
            />
          </LabelArea>
        </Form>

        <ButtonCreate
          bg={_gym.COLORS.GREEN_600}
          text='Salvar'
          onPress={handleSubmit(handleAddExercise)}
        />
      </Main>
    </Container>
}