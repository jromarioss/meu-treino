import { FlatList } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container} from '../../components/Container';
import { Text } from '../../components/Text';
import { Main } from '../../components/Main';


import { exercise, partOfBody } from '../../utils';
import { ExerciseProps, exerciseTypesProps } from '../../interfaces/exerciseProps';

import { ButtonBody, AreaButtonBody, AreaExercise, ButtonExercise, EmptyArea } from './styled';
import { theme } from '../../styles/theme';

export const Exercises = () => {
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
    <Container titleText='Exercícios'>
      <Main gap={16}>
        <AreaButtonBody>
          <FlatList
            data={partOfBody}        
            extraData={(item: string) => item}
            renderItem={({ item }) => (
              <ButtonBody
                onPress={() => handleSelectBody(item)}
                style={{ borderColor: buttonSelected === item ? theme.COLORS.GREEN_400 : theme.COLORS.GRAY_100 }}
              >
                <Text text={item} fs={18} />
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
                <Text text={item.exercise} fs={24} />
              </ButtonExercise>
            )}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
              <EmptyArea>
                <Text text="Selecione uma opção!" fs={24} nol={1} />
              </EmptyArea>
            )}
          />
        </AreaExercise>
      </Main>
    </Container>
  );
}