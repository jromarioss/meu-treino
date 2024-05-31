import { Image } from 'expo-image';
import { Alert, ScrollView, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Container} from '../../components/Container';
import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { ButtonCreate } from '../../components/ButtonCreate';
import { Loading } from '../../components/Loading';

import { exerciseDetails } from '../../utils';
import { useGym } from '../../hooks/useGym';
import { exerciseDetailsProps, exercisesInfoProps } from '../../interfaces/exerciseDetailsProps';

import { AreaImage, AreaText, AreaInfos, AreaInfosText, AreaButtons, ButtonSerie } from './styled';
import { CheckBox } from '../../components/CheckBox';
import { divisionProps } from '../../interfaces/divisionProps';
import { ExerciseProps } from '../../interfaces/exerciseProps';
import { exerciseStorageDTO, exerciseToEdit } from '../../storage';

interface RouteParamsProps {
  trainingName?: string;
  divisionName?: string;
  exerciseName?: string;
}

export const MyExerciseShow = () => {
  const _gym = useGym();
  const { goBack } = useNavigation();
  const route = useRoute();
  const { trainingName, divisionName, exerciseName } = route.params as RouteParamsProps;

  const [load, setLoad] = useState<boolean>(false);

  const [exerciseInfo, setExerciseInfo] = useState<exercisesInfoProps | null | undefined>(null);
  const [series, setSeries] = useState<number>(0);

  const fetchExercise = () => {
    setLoad(true);

    if (_gym.myExerciseShow) {
      const findExercise: exerciseDetailsProps | undefined = exerciseDetails.find((item: exerciseDetailsProps) => item.type === _gym.myExerciseShow?.type)
      const findExerciseInfo: exercisesInfoProps | undefined = findExercise?.exercises.find((item: exercisesInfoProps) => item.title === _gym.myExerciseShow?.title);

      setExerciseInfo(findExerciseInfo);
    }

    setLoad(false);
  }

  const handleAddSerie = () => {
    if (_gym.myExerciseShow?.series === series) {
      return;
    }

    return Alert.alert('Série', 'Deseja adicionar uma série como concluído?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: addSerie }
    ]);
  }

  const addSerie = () => {
    setSeries(state => state + 1)
  }

  const handleMakeExerciseDone = () => {
    if (_gym.myExerciseShow?.done) {
      return;
    }

    if (_gym.myExerciseShow?.series === series) {
      return Alert.alert('Exercício', 'Deseja tornar este exercício como feito?', [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => makeExerciseDone('check') }
      ]);
    } else {
      return Alert.alert('Error', 'Só pode finalizar o exercício quando finalizar suas séries!');
    }
  }

  const makeExerciseDone = async (type: 'check' | 'unCheck') => {
    if (_gym.myExerciseShow) {
      const newValue = _gym.myExerciseShow;
      if (type === 'check') {
        newValue.done = true;
      } else {
        newValue.done = false;
      }

      const divisionTemp = [..._gym.myDivisionsShow];
      const findDivision = divisionTemp[0].divisions.find((item: divisionProps) => item.division === divisionName);
      const findExercise = findDivision?.exercises.find((item) => item.title === exerciseName);

      if (findExercise) {
        if (type === 'check') {
          findExercise.done = true;
        } else {
          findExercise.done = false;
        }
      }

      const newObj: exerciseStorageDTO = {
        id: _gym.myDivisionsShow[0].id,
        training: _gym.myDivisionsShow[0].training,
        divisions: _gym.myDivisionsShow[0].divisions
      }

      await exerciseToEdit(newObj, trainingName ?? '')

      _gym.onSetMyExerciseShow(newValue);
      fetchExercise();
    }
  }

  const handleMakeExerUnDone = () => {
    return Alert.alert('Exercício', 'Deseja torna o exercício como não finalizado?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => makeExerciseDone('unCheck') }
    ]);
  }

  useEffect(() => {
    fetchExercise();
  }, []);

  return load ?
    <Loading />
    :
    <Container titleText='Detalhe do exercício'>
      <Main gap={16} ai='center'>
        <Text text={exerciseInfo?.title} fs={18} ta='center' />

        <AreaImage>
          {exerciseInfo?.image &&
            <Image
              source={exerciseInfo.image}
              contentFit='cover'
              style={{ width: '100%', height: '100%' }}
            />
          }
        </AreaImage>

        <AreaInfos>
          <AreaInfosText>
            <Text
              text={`${(_gym.myExerciseShow?.series ?? 0) <= 1 ? 'Série' : 'Séries'}:`}
              fs={24}
              fw={700}
            />

            <Text
              text={`${_gym.myExerciseShow?.series}`}
              fs={24}
            />
          </AreaInfosText>

          <AreaInfosText>
            <Text
              text={`${(_gym.myExerciseShow?.repetition ?? 0) <= 1 ? 'Repetição' : 'Repetições'}:`}
              fs={24}
              fw={700}
            />

            <Text text={`${_gym.myExerciseShow?.repetition}`} fs={24} />
          </AreaInfosText>
        </AreaInfos>

        <AreaButtons>
          {_gym.myExerciseShow?.done ?
            <ButtonSerie onPress={handleMakeExerUnDone}>
              <Text text='Desmarcar ' fs={24} />
            </ButtonSerie>
            :
            <ButtonSerie onPress={handleAddSerie}>
              <Text text={`${series} ${series <= 1 ? 'série' : 'séries'} concluída`} fs={24} />
            </ButtonSerie>
          }

          <CheckBox
            w={36} h={36} wi={24} hi={24}
            onPress={handleMakeExerciseDone}
            onIsCheck={_gym.myExerciseShow?.done}
          />
        </AreaButtons>

        <AreaText>
          {exerciseInfo?.description.map((text, index) => {
            return (
              <Text key={index} mt={(index ?? 0 === 0) && 16} text={`${index + 1}. ${text}`} fs={16} />
            )
          })}
        </AreaText>

        <ButtonCreate
          bg={_gym.COLORS.ORANGE_600} fs={32} fw={700} h={54}
          text='Voltar'
          onPress={goBack}
        />
      </Main>
    </Container>
}