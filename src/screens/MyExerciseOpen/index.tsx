import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';

import { Container} from '../../components/Container';
import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { ButtonCreate } from '../../components/ButtonCreate';

import { divisionProps, exercisesProps } from '../../interfaces/divisionProps';
import { exerciseGetByTraining, exerciseStorageDTO } from '../../storage';
import { AppError } from '../../utils';
import { useGym } from '../../hooks/useGym';

import ArrowDownImg from '../../assets/down.png';
import ArrowUpImg from '../../assets/up.png';

import { DivisionButtonDrop, DivisionArea, EmptyArea, Division, DivisionOutSide, DivisionDroped, ButtonExercises } from './styled';
import { Loading } from '../../components/Loading';

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

        const getAllExercises = data[0].divisions.map((item: divisionProps) => item.exercises);
        const arrayOfBool = Array.from({ length: getAllExercises.length }, () => false);
        setDropExercisesIndex(arrayOfBool);
      }
      _gym.onCleanMyExerciseShow();

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
      divisionIndex: divisionIndex,
      exerciseName: exerciseName
    });
  }

  const handleGoback = () => {
    goBack();
  }

  useEffect(() => {
    fetchTraining();
  }, []);

  return load ?
    <Loading />
    :
    <Container titleText={`Treino ${trainingName}`}>
      <Main gap={16}>
        <DivisionArea>
          {divisions.map((item: divisionProps, index: number) => {
            return (
              <DivisionOutSide key={index}>
                <Division>
                  <Text text={item.division} fs={24} nol={1} />

                  <DivisionButtonDrop onPress={() => handleDropExercisesIndex(index)}>
                    {dropExercisesIndex[index] ? 
                      <Image
                        source={ArrowUpImg}
                        contentFit='cover'
                        style={{ width: 32, height: 32 }}
                      />
                      :
                      <Image
                        source={ArrowDownImg}
                        contentFit='cover'
                        style={{ width: 32, height: 32 }}
                      />
                    }
                  </DivisionButtonDrop>
                </Division>
                {dropExercisesIndex[index] &&
                  <DivisionDroped>
                    {item.exercises.map((exercises: exercisesProps, indexInside: number) => {
                      return (
                        <ButtonExercises
                          key={indexInside}
                          onPress={() => handleGoToExercise(item.division, index, exercises.title)}
                        >
                          <Text
                            text={exercises.title}
                            fs={18} nol={1}
                            style={{
                              textDecorationLine: (exercises.done ?? 0) ? 'line-through' : 'none'
                            }}
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

        <ButtonCreate
          bg={_gym.COLORS.GREEN_600} fs={32} fw={700}
          text='Voltar'
          onPress={handleGoback}
        />
      </Main>
    </Container>
}