import { Image } from 'expo-image';
import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Text } from '../../../../components/Text';
import { Input } from '../../../../components/Input';
import { ButtonCreate } from '../../../../components/ButtonCreate';
import { Main } from '../../../../components/Main';
import { ButtonCloseModal } from '../../../../components/ButtonCloseModal';

import { exercisesInfoProps } from '../../../../interfaces/exerciseDetailsProps';
import { exerciseDetails } from '../../../../utils/exerciseDetails';
import { useGym } from '../../../../hooks/useGym';
import { exercisesProps } from '../../../../interfaces/divisionProps';

import { Container, AreaImage, Form, LabelArea } from './styled';
import { Loading } from '../../../../components/Loading';

interface ModalExerciseProps {
  exercise: exercisesProps | null;
  onExerciseEdit: (value: exercisesProps) => void;
  onClose: () => void;
}

interface formData {
  serieTxt: string;
  repetitionTxt: string;
}

export const ModalExercise = ({ exercise, onExerciseEdit, onClose }: ModalExerciseProps) => {
  const _gym = useGym();

  const { control, handleSubmit, reset } = useForm<formData>({
    defaultValues: {
      serieTxt: exercise?.series.toString(),
      repetitionTxt: exercise?.repetition.toString()
    }
  });

  const [exerciseInfo, setExerciseInfo] = useState<exercisesInfoProps | null | undefined>(null);
  const [serieTxt, setSerieTxt] = useState<string>('');
  const [repetitionTxt, setRepetitionTxt] = useState<string>('');
  const [load, setLoad] = useState<boolean>(false);

  const fetchExercise = () => {
    setLoad(true);

    if (exercise) {

      const findExerciseType = exerciseDetails.find(item => item.type === exercise?.type);
      const findExerciseInfo = findExerciseType?.exercises.find(item => item.title === exercise?.title);

      setExerciseInfo(findExerciseInfo);
    }

    setLoad(false);
  }

  const handleEditExercise = ({ repetitionTxt, serieTxt }: formData) => {
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
        title: exercise?.title,
        series: parseInt(series),
        repetition: parseInt(repetitions),
        done: false
      }

      onExerciseEdit(newExercise);
      reset();
      handleCloseModal();
    }
  }


  const handleCloseModal = () => {
    onClose();
  }

  useEffect(() => {
    fetchExercise();
  }, []);

  return load ?
    <Loading />
    :
    <Container>
      <ButtonCloseModal t={1} r={1} cl={'black'} onPress={handleCloseModal} />

      <Main jc='space-between' ai='center' pd={0} >
        <Text text={exercise?.title} mt={20} ta='center' fs={18} fw={700} cl={_gym.COLORS.GRAY_800} />

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
          bg={_gym.COLORS.GREEN_600} h={54} fs={32} fw={700}
          text='Salvar'
          onPress={handleSubmit(handleEditExercise)}
        />
      </Main>
    </Container>
}