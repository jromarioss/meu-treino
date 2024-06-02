import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';

import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { Loading } from '../../components/Loading';
import { Container} from '../../components/Container';
import { ModalExercise } from './components/ModalExercise';
import { ButtonCustom } from '../../components/ButtonCustom';
import { ButtonCreate } from '../../components/ButtonCreate';

import { divisionProps, exercisesProps } from '../../interfaces/divisionProps';
import { exerciseGetByTraining, exerciseStorageDTO, exerciseToEdit } from '../../storage';
import { AppError } from '../../utils';
import { useGym } from '../../hooks/useGym';

import ArrowDownImg from '../../assets/down.png';
import ArrowUpImg from '../../assets/up.png';

import { DivisionButtonDrop, DivisionArea, EmptyArea, Division, DivisionOutSide, DivisionDroped, DivisionRight, ExercisesEdit } from './styled';

export const MyExerciseEdit = () => {
  const _gym = useGym();
  const { goBack, navigate } = useNavigation();

  const [divisions, setDivisions] = useState<divisionProps[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [indexToEdit, setIndexToEdit] = useState<number>(0);
  const [dropExercisesIndex, setDropExercisesIndex] = useState<boolean[]>([]);
  const [exerciseModal, setExerciseModal] = useState<exercisesProps | null>(null);
//Falta a parte do cronometro e de adicionar exercicios
  const fetchTraining = async () => {
    try {
      setLoad(true);
      
      const data: exerciseStorageDTO[] = await exerciseGetByTraining(_gym.trainingName);

      if (data) {
        _gym.onSetMyDivisionsShow(data);
        setDivisions(data[0].divisions);

        const getAllExercises: exercisesProps[][] = data[0].divisions.map((item: divisionProps) => item.exercises);
        const arrayOfBool: boolean[] = Array.from({ length: getAllExercises.length }, () => false);
        setDropExercisesIndex(arrayOfBool);
      }

      setLoad(false);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Deletar treino', error.message);
      } else {
        Alert.alert('Deletar treino', 'Não foi possível deletar o traino.');
      }
    }
  }

  const handleDropExercisesIndex = (indexToChange: number) => {
    const hasOneTrue: boolean = dropExercisesIndex.some((item: boolean, index: number) => item === true && index !== indexToChange);

    if (hasOneTrue) {
      return;
    }

    const changeIndexTrue: boolean[] = dropExercisesIndex.map((item: boolean, index: number) => {
      if (index === indexToChange) {
        return !item;
      }
      return false;
    });

    setDropExercisesIndex(changeIndexTrue);
  }

  const handleDeleteDivision = (nameToDelete: string) => {
    Alert.alert('Excluir', `Deseja excluir a divisão ${nameToDelete}?`,[
      { text: 'Não', style: 'cancel'},
      { text: 'Sim', onPress: () => deleteDivision(nameToDelete) }
    ]);
  }

  const deleteDivision = async (nameToDelete: string) => {
    try {
      const divisionToRemove: divisionProps[] = divisions.filter((item: divisionProps) => item.division !== nameToDelete);

      const divisionTemp = [..._gym.myDivisionsShow];
      divisionTemp[0].divisions = divisionToRemove;

      const newObj: exerciseStorageDTO = {
        id: divisionTemp[0].id,
        training: divisionTemp[0].training,
        divisions: divisionTemp[0].divisions
      }

      await exerciseToEdit(newObj, _gym.trainingName);

      fetchTraining();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Não foi possível deletar o treino.');
      }
    }
  }
  
  const handleDeleteExercise = (nameToDelete: string, index: number) => {
    Alert.alert('Excluir', `Deseja excluir o exercício ${nameToDelete}?`,[
      { text: 'Não', style: 'cancel'},
      { text: 'Sim', onPress: () => deleteExercise(nameToDelete, index) }
    ]);
  }

  const deleteExercise = async (nameToDelete: string, index: number) => {
    try {
      const exerciseToRemove: exercisesProps[] = divisions[0].exercises.filter((item: exercisesProps) => item.title !== nameToDelete);
      
      const divisionTemp = [..._gym.myDivisionsShow];
      if (divisionTemp[0].divisions[index].exercises.length === 1) {
        return Alert.alert('Error', 'Não foi possível deletar, por que a divisão deve ter pelo menos um exercício!');
      }
      divisionTemp[0].divisions[index].exercises = exerciseToRemove;

      const newObj: exerciseStorageDTO = {
        id: divisionTemp[0].id,
        training: divisionTemp[0].training,
        divisions: divisionTemp[0].divisions
      }

      await exerciseToEdit(newObj, _gym.trainingName);

      fetchTraining();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Não foi possível deletar o treino.');
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setIndexToEdit(0);
    setExerciseModal(null);
  }

  const handleEditExercise = (item: exercisesProps, index: number) => {
    setIndexToEdit(index)
    setExerciseModal(item);
    setShowModal(true);
  }

  const editExercise = async (value: exercisesProps) => {
    try {
      const divisionTemp = [..._gym.myDivisionsShow];
      const exercises = divisionTemp[0].divisions[indexToEdit].exercises;
      const exerciseIndex = exercises.findIndex((item: exercisesProps) => item.title === value.title);

      if (exerciseIndex !== -1) {
        exercises[exerciseIndex] = value;
      } else {
        return;
      }

      const newObj: exerciseStorageDTO = {
        id: divisionTemp[0].id,
        training: divisionTemp[0].training,
        divisions: divisionTemp[0].divisions
      }

      await exerciseToEdit(newObj, _gym.trainingName);

      setIndexToEdit(0);
      setExerciseModal(null);
      fetchTraining();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Não foi possível editar o exercício.');
      }
    }
  }

  const handleGoToAddExercise = (name: string) => {
    navigate('myExerciseEditAdd', { divisionName: name });
  }

  useEffect(() => {
    fetchTraining();
  }, []);

  return load ?
    <Loading />
    :
    <Container titleText={`Editar ${_gym.trainingName}`}>
      <Main gap={16} ai='center'>
        <DivisionArea>
          {divisions.map((item: divisionProps, index: number) => {
            return (
              <DivisionOutSide key={index}>
                <Division>
                  <Text text={item.division} fs={24} nol={1} />

                  <DivisionRight>
                    {!dropExercisesIndex.some((item: boolean) => item == true) &&
                      <ButtonCustom
                        h={36} w={36} ih={16} iw={16}
                        ic='white' plus
                        onPress={() => handleGoToAddExercise(item.division)}
                        bg={_gym.COLORS.GREEN_600}
                      />
                    }
                    {!dropExercisesIndex.some((item: boolean) => item == true) &&
                      <ButtonCustom
                        h={36} w={36} ih={16} iw={16}
                        ic='white'
                        onPress={() => handleDeleteDivision(item.division)}
                        bg={_gym.COLORS.RED_600}
                      />
                    }
                    <DivisionButtonDrop onPress={() => handleDropExercisesIndex(index)}>
                      <Image
                        source={dropExercisesIndex[index] ?  ArrowUpImg : ArrowDownImg}
                        contentFit='cover' style={{ width: 32, height: 32 }}
                      />
                    </DivisionButtonDrop>
                  </DivisionRight>
                </Division>
                {dropExercisesIndex[index] &&
                  <DivisionDroped>
                    {item.exercises.map((exercises: exercisesProps, indexInside: number) => {
                      return (
                        <ExercisesEdit key={indexInside}>
                          <Text w={180} text={exercises.title} fs={18} nol={1} />

                          <ButtonCustom
                            h={32} w={32} ih={16} iw={16}
                            ic='white' ei
                            onPress={() => handleEditExercise(item.exercises[indexInside], index)}
                            bg={_gym.COLORS.BLUE_600}
                          />

                          <ButtonCustom
                            h={32} w={32} ih={16} iw={16}
                            ic='white'
                            onPress={() => handleDeleteExercise(exercises.title, index)}
                            bg={_gym.COLORS.RED_600}
                          />
                        </ExercisesEdit>
                      )
                    })}
                  </DivisionDroped>
                }
              </DivisionOutSide>
            )
          })}
              
          {(divisions && divisions.length <= 0) &&
            <EmptyArea>
              <Text text="Nenhuma divisão cadastrardo!" fs={24} nol={1} />
            </EmptyArea>
          }
        </DivisionArea>

        {showModal &&
          <ModalExercise
            exercise={exerciseModal}
            onExerciseEdit={editExercise}
            onClose={handleCloseModal}
          />
        }
        
        {!dropExercisesIndex.some((item: boolean) => item == true) &&
          <ButtonCreate
            bg={_gym.COLORS.ORANGE_600} fs={32} fw={700} h={54}
            text='Voltar'
            onPress={goBack}
          />
        }
      </Main>
    </Container>
}