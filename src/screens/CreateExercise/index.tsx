import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, FlatList } from 'react-native';

import { Container} from '../../components/Container';
import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { ButtonCreate } from '../../components/ButtonCreate';
import { ModalExercise } from './components/ModalExercise';
import { Loading } from '../../components/Loading';

import { useGym } from '../../hooks/useGym';
import { exercise } from '../../utils/exercises';
import { ExerciseProps, exerciseTypesProps } from '../../interfaces/exerciseProps';
import { partOfBody } from '../../utils/partOfBody';
import { divisionProps, exercisesProps } from '../../interfaces/divisionProps';

import { theme } from '../../styles/theme';
import { AreaButtonBody, AreaExercise, ButtonBody, ButtonExercise, ButtonDivisionName } from './styled';
import { EmptyArea } from '../Exercises/styled';

interface RouteParamsProps {
  divisionName: string,
}

export const CreateExercise = () => {
  const _gym = useGym();
  const { navigate } = useNavigation();
  const route = useRoute();
  const { divisionName } = route.params as RouteParamsProps;

  const [buttonSelected, setButtonSelected] = useState<string | null>(null);
  const [exerciseSelected, setExerciseSelected] = useState<ExerciseProps | null>(null);
  const [exerciseArray, setExerciseArray] = useState<exercisesProps[]>([]);
  const [modalExercise, setModalExercise] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [showButtonFinish, setShowButtonFinish] = useState<boolean>(false);
  const [exerciseSelectedToModal, setExerciseSelectedToModal] = useState<exerciseTypesProps | null>(null);
  const [load, setLoad] = useState<boolean>(false);

  const fetchExercisesFromDivision = () => {
    setLoad(true);

    const filterDivisionFromName = _gym.divisionDatas.find(item => item.division === divisionName);
    
    if (filterDivisionFromName) {
      setExerciseArray(filterDivisionFromName?.exercises)
    }

    setLoad(false);
  }

  const handleSelectBody = (value: string) => {
    const findExercise = exercise.find(item => item.title === value);

    if (findExercise) {
      setExerciseSelected(findExercise)
    }

    setButtonSelected(value);
  }

  const handleOpenModalExercise = (value: exerciseTypesProps) => {
    const exerciseArrayExists = exerciseArray.find(item => item.title === value.exercise);

    if (exerciseArrayExists) {
      return Alert.alert('Error', 'Este exercício já foi adicionado na sua divisão.');
    }

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
    if (exerciseArray.length > 7) {
      return Alert.alert('Error', 'Cada divisão pode ter no maxímo 8 exercícios.');
    }

    setExerciseArray(state => [...state, value]);
    setShowButtonFinish(true);
  }

  const handleCloseModalExercise = () => {
    setModalExercise(false);
    setModalDelete(false);
  }

  const deleteExerciseFromDivision = (value: string) => {
    _gym.onRemoveExercisesFromDivisionData(divisionName, value);
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
    _gym.onSetDivisionDatas(data);
    _gym.onCleanDoubtType();
    setExerciseArray([]);
    navigate('createDivision');
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
    _gym.onSetDoubtType('Create exercises');
    fetchExercisesFromDivision();
  }, []);

  return load ?
    <Loading />
    :
    <Container titleText='Adicionar exercícios' doubt>
      <Main gap={16} ai='center'>
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
              <Text
                fs={18} cl={_gym.COLORS.GRAY_100} nol={1}
                text={`${exerciseArray.length} ${exerciseArray.length > 1 ? 'exercícios' : 'exercicio'} adicionado na ${divisionName}`}
              />
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
        
        {(!modalExercise && showButtonFinish) &&
          <ButtonCreate
            bg={_gym.COLORS.GREEN_600} h={54} fs={32} fw={700}
            text='Finalizar'
            onPress={handleAddExercisesToDivision}
          />
        }
      </Main>
    </Container>
}