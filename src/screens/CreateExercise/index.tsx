import { Container, Main, AreaButtonBody, AreaExercise, ButtonBody, ButtonBodyTxt, ButtonExercise, ButtonExerciseTxt, DivisionNameTxt, ButtonFinish, ButtonFinishtxt, ButtonDivisionName } from './styled';
import { Header } from '../../components/Header';
import { useContext, useEffect, useState } from 'react';
import { exercise } from '../../utils/exercises';
import { Menu } from '../../components/Menu';
import { GymContext } from '../../context/gymContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ExerciseProps, exerciseTypesProps } from '../../interfaces/exerciseProps';
import { Alert, FlatList, Text } from 'react-native';
import { partOfBody } from '../../utils/partOfBody';
import { theme } from '../../styles/theme';
import { ModalExercise } from './components/ModalExercise';
import { divisionProps, exercisesProps } from '../../interfaces/divisionProps';

interface RouteParamsProps {
  divisionName: string,
}
/* lembrar finalizar a parte de adicione exerciios na divisao e depois salvar */
export const CreateExercise = () => {
  const { showMenu, onSetDivisionDatas } = useContext(GymContext);
  const navigate = useNavigation();
  const route = useRoute();
  const { divisionName } = route.params as RouteParamsProps;

  const [buttonSelected, setButtonSelected] = useState<string | null>(null);
  const [exerciseSelected, setExerciseSelected] = useState<ExerciseProps | null>(null);
  const [exerciseArray, setExerciseArray] = useState<exercisesProps[]>([]);
  const [modalExercise, setModalExercise] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [buttonFinishDisabled, setButtonFinishDisabled] = useState<boolean>(true);
  const [exerciseSelectedToModal, setExerciseSelectedToModal] = useState<exerciseTypesProps | null>(null);

  const handleSelectBody = (value: string) => {
    const findExercise = exercise.find(item => item.title === value);

    if (findExercise) {
      setExerciseSelected(findExercise)
    }

    setButtonSelected(value);
  }

  const handleOpenModalExercise = (value: exerciseTypesProps) => {
    setExerciseSelectedToModal(value);
    setModalExercise(true);
  }

  const handleOpenModalDelete = () => {
    if (exerciseArray.length <= 0) {
      return;
    } else {
      setModalDelete(true);
      setModalExercise(true);
    }
  }

  const handleAddExerciseArray = (value: exercisesProps) => {
    const exerciseArrayExists = exerciseArray.find(item => item.title === value.title);

    if (exerciseArrayExists) {
      Alert.alert('Error', 'Este exercício já foi adicionado na sua divisão.');
    } else {
      setExerciseArray(state => [...state, value])
    }
  }

  const handleCloseModalExercise = () => {
    setModalExercise(false);
    setModalDelete(false);
  }

  const deleteExerciseFromDivision = (value: string) => {
    const exercisesFilter = exerciseArray.filter(item => item.title !== value);
    setExerciseArray(exercisesFilter);
  }

  const handleDeleteExerciseFromDivision = (value: string) => {
    Alert.alert('Excluir', `Deseja excluir o exercício ${value} da sua divisão?`, [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => deleteExerciseFromDivision(value) }
    ]);
  }

  const finishDivision = (data: divisionProps) => {
    onSetDivisionDatas(data);
    navigate.navigate('createDivision', { divisionName: divisionName });
  }
  
  const handleAddExercisesToDivision = () => {
    const newExercise: divisionProps = {
      division: divisionName,
      exercises: exerciseArray,
    }

    Alert.alert('Exercício', `Deseja adicionar esses ${newExercise.exercises.length < 1 ? 'exercício' : 'exercícios'} na divisão ${divisionName}?`, [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => finishDivision(newExercise) }
    ]);
  }

  useEffect(() => {
    if (exerciseArray.length > 0) {
      setButtonFinishDisabled(false);
    } else {
      setButtonFinishDisabled(true);
    }
  }, [exerciseArray])

  return (
    <Container>
      <Header title='Adicionar exercícios' />
      {showMenu && <Menu />}

      <Main>
        {modalExercise ?
          <ModalExercise
            exercise={exerciseSelectedToModal}
            exercises={exerciseArray}
            deleteExercise={modalDelete}
            onExercise={handleAddExerciseArray}
            onClose={handleCloseModalExercise}
            onDeleteExercise={handleDeleteExerciseFromDivision}
          />
          :
          <>
            <ButtonDivisionName onPress={handleOpenModalDelete}>
              <DivisionNameTxt>{exerciseArray.length} {exerciseArray.length > 1 ? 'exercícios' : 'exercicio'} adicionado na {divisionName}</DivisionNameTxt>
            </ButtonDivisionName>

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
                  <ButtonExercise onPress={() => handleOpenModalExercise(item)}>
                    <ButtonExerciseTxt>{item.exercise}</ButtonExerciseTxt>
                  </ButtonExercise>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </AreaExercise>
          </>
        }
        
        {!modalExercise &&
          <ButtonFinish onPress={handleAddExercisesToDivision} disabled={buttonFinishDisabled}>
            <ButtonFinishtxt>Finalizar</ButtonFinishtxt>
          </ButtonFinish>
        }
      </Main>
    </Container>
  );
}