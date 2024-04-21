import { Container, Main, AreaButtonBody, AreaExercise, ButtonBody, ButtonBodyTxt, ButtonExercise, ButtonExerciseTxt } from './styled';
import { Header } from '../../components/Header';
import { useContext, useState } from 'react';
import { exercise } from '../../utils/exercises';
import { Menu } from '../../components/Menu';
import { GymContext } from '../../context/gymContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ExerciseProps, exerciseTypesProps } from '../../interfaces/exerciseProps';
import { FlatList } from 'react-native';
import { partOfBody } from '../../utils/partOfBody';
import { theme } from '../../styles/theme';
import { ModalExercise } from './components/ModalExercise';

interface RouteParamsProps {
  divisionName: string,
}

export const CreateExercise = () => {
  const { showMenu } = useContext(GymContext);
  const navigate = useNavigation();
  const route = useRoute();
  const { divisionName } = route.params as RouteParamsProps;

  const [buttonSelected, setButtonSelected] = useState<string | null>(null);
  const [exerciseSelected, setExerciseSelected] = useState<ExerciseProps | null>(null);
  const [modalExercise, setModalExercise] = useState<boolean>(false);
  const [exerciseSelectedToModal, setExerciseSelectedToModal] = useState<string>('');

  const handleSelectBody = (value: string) => {
    const findExercise = exercise.find(item => item.title === value);

    if (findExercise) {
      setExerciseSelected(findExercise)
    }

    setButtonSelected(value);
  }

  const handleOpenModalExercise = (name: string) => {
    setExerciseSelectedToModal(name);
    setModalExercise(true);
  }

  const handleGoExerciseDetail = (value: exerciseTypesProps) => {
    navigate.navigate('exerciseDetail', { type: value.type, exercise: value.exercise })
  }

  return (
    <Container>
      <Header title='Adicionar exercícios' />
      {showMenu && <Menu />}

      <Main>
        {modalExercise ?
          <ModalExercise
            exercise={exerciseSelectedToModal}
          />
          :
          <>
            <AreaButtonBody>
              <FlatList
                data={partOfBody}        
                extraData={(item: string) => item}
                renderItem={({ item }) => (
                  <ButtonBody
                    onPress={() => handleSelectBody(item)}
                    style={{ borderColor: buttonSelected === item ? theme.COLORS.GREEN_400 : theme.COLORS.GRAY_100 }}
                  >
                    <ButtonBodyTxt>{item}</ButtonBodyTxt>
                  </ButtonBody>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </AreaButtonBody>

            <AreaExercise>
              <FlatList
                data={exerciseSelected?.types}       
                extraData={(item: exerciseTypesProps) => item}
                renderItem={({ item }) => (
                  <ButtonExercise onPress={() => handleOpenModalExercise(item.exercise)}>
                    <ButtonExerciseTxt>{item.exercise}</ButtonExerciseTxt>
                  </ButtonExercise>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </AreaExercise>
          </>
        }
      </Main>
    </Container>
  );
}