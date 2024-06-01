import { Image } from 'expo-image';
import { ScrollView } from 'react-native';
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

import { AreaImage, AreaText } from './styled';

interface RouteParamsProps {
  type: string;
  exercise: string;
}

export const ExerciseDetail = () => {
  const _gym = useGym();
  const { goBack } = useNavigation();
  const route = useRoute();
  const { type, exercise } = route.params as RouteParamsProps;

  const [load, setLoad] = useState<boolean>(false);

  const [exerciseInfo, setExerciseInfo] = useState<exercisesInfoProps | null | undefined>(null);

  const fetchExercise = () => {
    setLoad(true);

    const findExerciseType: exerciseDetailsProps | undefined = exerciseDetails.find((item: exerciseDetailsProps) => item.type === type);
    const findExerciseInfo: exercisesInfoProps | undefined = findExerciseType?.exercises.find((item: exercisesInfoProps) => item.title === exercise);
    setExerciseInfo(findExerciseInfo);

    setLoad(false);
  }

  useEffect(() => {
    fetchExercise();
  }, []);

  return load ?
    <Loading />
    :
    <Container titleText='Detalhe do exercício'>
      <Main gap={16} mb={16} ai='center'>
        <Text text={exerciseInfo?.title} fs={24} ta='center' />

        <AreaImage>
          {exerciseInfo?.image &&
            <Image
              source={exerciseInfo.image}
              contentFit='cover'
              style={{ width: '100%', height: '100%' }}
            />
          }
        </AreaImage>

        <AreaText>
          {exerciseInfo?.description.map((text, index) => {
            return (
              <Text key={index} text={`${index + 1}. ${text}`} fs={16} />
            )
          })}
        </AreaText>

        <ButtonCreate
          bg={_gym.COLORS.GREEN_700} fs={28} fw={700} h={48}
          text='Voltar'
          onPress={goBack}
        />
      </Main>
    </Container>
}