import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';

import { Container} from '../../components/Container';
import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { ButtonCreate } from '../../components/ButtonCreate';

import { divisionProps, exercisesProps } from '../../interfaces/divisionProps';
import { exerciseGetByTraining, exerciseStorageDTO, exerciseToEdit } from '../../storage';
import { AppError } from '../../utils';
import { useGym } from '../../hooks/useGym';

import ArrowDownImg from '../../assets/down.png';
import ArrowUpImg from '../../assets/up.png';

import { DivisionButtonDrop, DivisionArea, EmptyArea, Division, DivisionOutSide, DivisionDroped, ButtonExercises } from './styled';
import { Loading } from '../../components/Loading';
import { CheckBox } from '../../components/CheckBox';

interface RouteParamsProps {
  trainingName: string;
}

export const MyExerciseOpen = () => {
  const route = useRoute();
  const _gym = useGym();
  const { navigate, goBack } = useNavigation();
  const { trainingName } = route.params as RouteParamsProps;

  const [divisions, setDivisions] = useState<divisionProps[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [dropExercisesIndex, setDropExercisesIndex] = useState<boolean[]>([]);
  
  const fetchTraining = async () => {
    try {
      setLoad(true);
      
      const data: exerciseStorageDTO[] = await exerciseGetByTraining(trainingName);

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

  const handleGoToExercise = (divisionName: string, divisionIndex: number, exerciseName: string) => {
    const findExercise: exercisesProps[] = divisions[divisionIndex].exercises.filter((item: exercisesProps) => {
      return item.title === exerciseName
    });

    const newObj: exercisesProps = {
      title: findExercise[0].title,
      repetition: findExercise[0].repetition,
      series: findExercise[0].series,
      type: findExercise[0].type,
      done: findExercise[0].done,
    }

    _gym.onSetMyExerciseShow(newObj);
    navigate('myExerciseShow', {
      divisionName: divisionName,
      trainingName: trainingName,
      exerciseName: exerciseName
    });
  }

  const handleUnCheckAll = (divisionName: string) => {
    return Alert.alert('Exercício', 'Deseja marcar todos exercício com não feito?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => unCheckAll(divisionName) }
    ]);
  }

  const unCheckAll = async (divisionName: string) => {
    const divisionTemp = [..._gym.myDivisionsShow];

    divisionTemp[0].divisions.forEach((division: divisionProps) => {
      if (division.division === divisionName) {
        division.exercises.forEach((exercise: exercisesProps) => {
          exercise.done = false
        });
      }
    });

    const newObj: exerciseStorageDTO = {
      id: _gym.myDivisionsShow[0].id,
      training: _gym.myDivisionsShow[0].training,
      divisions: _gym.myDivisionsShow[0].divisions
    }

    await exerciseToEdit(newObj, trainingName ?? '')

    fetchTraining();
  }

  const handleGoback = () => {
    goBack();
  }

  useEffect(() => {
    fetchTraining();
  }, []);

  useEffect(() => {
    if (_gym.myExerciseShow) {
      fetchTraining();
    }
  }, [_gym.myExerciseShow]);

  return load ?
    <Loading />
    :
    <Container titleText={`Treino ${trainingName}`}>
      <Main gap={16} ai='center'>
        <DivisionArea>
          {divisions.map((item: divisionProps, index: number) => {
            return (
              <DivisionOutSide key={index}>
                <Division>
                  <Text text={item.division} w={220} fs={24} nol={1} />

                  <DivisionButtonDrop onPress={() => handleDropExercisesIndex(index)}>
                    <Image
                      source={dropExercisesIndex[index] ?  ArrowUpImg : ArrowDownImg}
                      contentFit='cover' style={{ width: 32, height: 32 }}
                    />
                  </DivisionButtonDrop>
                </Division>
                {dropExercisesIndex[index] &&
                  <DivisionDroped>
                    {item.exercises.every(item => item.done) &&
                      <ButtonCreate
                        bg={_gym.COLORS.GREEN_600} fs={14} fw={700} w={124} h={32} mt={12}
                        text='Desmarca todos'
                        onPress={() => handleUnCheckAll(item.division)}
                      />
                    }
                    {item.exercises.map((exercises: exercisesProps, indexInside: number) => {
                      return (
                        <ButtonExercises
                          key={indexInside}
                          onPress={() => handleGoToExercise(item.division, index, exercises.title)}
                        >
                          <Text w={224} text={exercises.title} fs={18} nol={1} />

                          <CheckBox
                            w={28} h={28} wi={18} hi={18}
                            onIsCheck={exercises.done}
                          />
                        </ButtonExercises>
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
        
        {!dropExercisesIndex.some((item: boolean) => item == true) &&
          <ButtonCreate
            bg={_gym.COLORS.GREEN_600} fs={32} fw={700}
            text='Voltar'
            onPress={handleGoback}
          />
        }
      </Main>
    </Container>
}