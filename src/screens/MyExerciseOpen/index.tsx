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

interface RouteParamsProps {
  trainingName: string;
}

export const MyExerciseOpen = () => {
  const route = useRoute();
  const _gym = useGym();
  const navigate = useNavigation();
  const { trainingName } = route.params as RouteParamsProps;

  const [divisions, setDivisions] = useState<divisionProps[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [dropExercisesIndex, setDropExercisesIndex] = useState<boolean[]>([]);
  
  const fetchTraining = async () => {
    try {
      setLoad(true);
      
      const data: exerciseStorageDTO[] = await exerciseGetByTraining(trainingName);

      if (data) {
        setDivisions(data[0].divisions);

        const getAllExercises = data[0].divisions.map((item: divisionProps) => item.exercises);
        const arrayOfBool = Array.from({ length: getAllExercises.length }, () => false);
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

  const handleGoToExercise = (exerciseName: string) => {
    console.log(exerciseName)
    //fazer a gora a parte q manda para tela do exercicio e mostra e puchar o exercício pelo nome.
  }

  const handleGoback = () => {
    navigate.goBack();
  }

  useEffect(() => {
    fetchTraining();
  }, []);

  return (
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
                          onPress={() => handleGoToExercise(exercises.title)}
                        >
                          <Text text={exercises.title} fs={18} nol={1} />
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
  );
}