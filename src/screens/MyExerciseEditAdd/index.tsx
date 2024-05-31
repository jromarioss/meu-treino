import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, FlatList } from 'react-native';

import { Container} from '../../components/Container';
import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { ModalExercise } from './components/ModalExercise';

import { AppError } from '../../utils';
import { useGym } from '../../hooks/useGym';
import { exercise } from '../../utils/exercises';
import { partOfBody } from '../../utils/partOfBody';
import { exerciseStorageDTO, exerciseToEdit } from '../../storage';
import { divisionProps, exercisesProps } from '../../interfaces/divisionProps';
import { ExerciseProps, exerciseTypesProps } from '../../interfaces/exerciseProps';

import { theme } from '../../styles/theme';
import { AreaButtonBody, AreaExercise, ButtonBody, ButtonExercise } from './styled';
import { EmptyArea } from '../Exercises/styled';

interface RouteParamsProps {
  divisionName: string,
}

export const MyExerciseEditAdd = () => {
  const _gym = useGym();
  const { navigate } = useNavigation();
  const route = useRoute();
  const { divisionName } = route.params as RouteParamsProps;

  const [buttonSelected, setButtonSelected] = useState<string | null>(null);
  const [exerciseSelected, setExerciseSelected] = useState<ExerciseProps | null>(null);
  const [modalExercise, setModalExercise] = useState<boolean>(false);
  const [exerciseSelectedToModal, setExerciseSelectedToModal] = useState<exerciseTypesProps | null>(null);

  const handleSelectBody = (value: string) => {
    const findExercise = exercise.find(item => item.title === value);

    if (findExercise) {
      setExerciseSelected(findExercise);
    }

    setButtonSelected(value);
  }

  const handleOpenModalExercise = (value: exerciseTypesProps) => {
    const findDivision = _gym.myDivisionsShow[0].divisions.find((item: divisionProps) => item.division === divisionName);
    const verifyExerciseIfExists = findDivision?.exercises.find((item: exercisesProps) => item.title === value.exercise);

    if (verifyExerciseIfExists) {
      return Alert.alert('Error', 'Este exercício já existe na sua divisão.');
    }

    setExerciseSelectedToModal(value);
    setModalExercise(true);
  }

  const handleAddExerciseArray = async (value: exercisesProps) => {
    try {
      const findDivision = _gym.myDivisionsShow[0].divisions.find((item: divisionProps) => item.division === divisionName);
      findDivision?.exercises.push(value);
      
      const newObj: exerciseStorageDTO = {
        id: _gym.myDivisionsShow[0].id,
        training: _gym.myDivisionsShow[0].training,
        divisions: _gym.myDivisionsShow[0].divisions
      }

      await exerciseToEdit(newObj, _gym.myDivisionsShow[0].training);

      setExerciseSelectedToModal(null);
      setExerciseSelected(null);
      setButtonSelected(null);

      navigate('myExercise');
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Não foi possível adicionar este exercício.');
      }
    }
  }

  const handleCloseModalExercise = () => {
    setModalExercise(false);
  }

  return (
    <Container titleText='Adicionar exercícios'>
      <Main gap={16} ai='center'>
        {modalExercise ?
          <ModalExercise
            exercise={exerciseSelectedToModal}
            onExercise={handleAddExerciseArray}
            onClose={handleCloseModalExercise}
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
                    <Text
                      fs={18} cl={_gym.COLORS.GRAY_100}
                      text={item}
                    />
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
                  <ButtonExercise onPress={() => handleOpenModalExercise(item)}>
                    <Text
                      fs={24} cl={_gym.COLORS.GRAY_100}
                      text={item.exercise}
                    />
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
          </>
        }
      </Main>
    </Container>
  );
}