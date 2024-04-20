import { Container, Main, ButtonBody, ButtonBodyTxt, AreaButtonBody, AreaExercise, ButtonExercise, ButtonExerciseTxt } from './styled';
import { Header } from '../../components/Header';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Menu } from '../../components/Menu';
import { GymContext } from '../../context/gymContext';
import { FlatList } from 'react-native';
import { theme } from '../../styles/theme';
import { exercise } from '../../utils/exercises';
import { partOfBody } from '../../utils/partOfBody';
import { ExerciseProps, exerciseTypesProps } from '../../interfaces/exerciseProps';

export const Exercises = () => {
  const { showMenu } = useContext(GymContext);
  const navigate = useNavigation();

  const [buttonSelected, setButtonSelected] = useState<string | null>(null);
  const [exerciseSelected, setExerciseSelected] = useState<ExerciseProps | null>(null);

  const handleSelectBody = (value: string) => {
    const findExercise = exercise.find(item => item.title === value);

    if (findExercise) {
      setExerciseSelected(findExercise)
    }

    setButtonSelected(value);
  }

  const handleGoExerciseDetail = (value: exerciseTypesProps) => {
    navigate.navigate('exerciseDetail', { type: value.type, exercise: value.exercise })
  }

  return (
    <Container>
      <Header title='Exercícios' />
      {showMenu && <Menu />}

      <Main>
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
              <ButtonExercise onPress={() => handleGoExerciseDetail(item)}>
                <ButtonExerciseTxt>{item.exercise}</ButtonExerciseTxt>
              </ButtonExercise>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </AreaExercise>
      </Main>
    </Container>
  )
}