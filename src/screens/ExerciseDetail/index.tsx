import { AreaImage, AreaText, ButtonBack, ButtonBackTxt, Container, InfoText, Main, Title } from './styled';
import { Header } from '../../components/Header';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';
import { GymContext } from '../../context/gymContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { exerciseDetails } from '../../utils/exerciseDetails';
import { exercisesInfoProps } from '../../interfaces/exerciseDetailsProps';
import { ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Loading } from '../../components/Loading';

interface RouteParamsProps {
  type: string
  exercise: string
}

export const ExerciseDetail = () => {
  const { showMenu } = useContext(GymContext);
  const navigate = useNavigation();
  const route = useRoute();
  const { type, exercise } = route.params as RouteParamsProps;

  const [load, setLoad] = useState<boolean>(false);

  const [exerciseInfo, setExerciseInfo] = useState<exercisesInfoProps | null | undefined>(null);

  const fetchExercise = () => {
    setLoad(true);

    const findExerciseType = exerciseDetails.find(item => item.type === type);
    const findExerciseInfo = findExerciseType?.exercises.find(item => item.title === exercise);
    setExerciseInfo(findExerciseInfo);

    setLoad(false);
  }

  const handleGoback = () => {
    navigate.goBack();
  }

  useEffect(() => {
    fetchExercise();
  }, [])

  return load ?
    <Loading />
    :
    <Container>
      <Header title='Detalhe do exercício' />
      {showMenu && <Menu />}

      <ScrollView>
        <Main>
          <Title>{exerciseInfo?.title}</Title>

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
                <InfoText key={index}>{index + 1}. {text}</InfoText>
              )
            })}
          </AreaText>

          <ButtonBack onPress={handleGoback}>
            <ButtonBackTxt>Voltar</ButtonBackTxt>
          </ButtonBack>
        </Main>
      </ScrollView>
    </Container>
}