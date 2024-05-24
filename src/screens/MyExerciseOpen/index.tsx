import { useContext, useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';

import { Container} from '../../components/Container';
import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { ButtonCreate } from '../../components/ButtonCreate';

import { divisionProps } from '../../interfaces/divisionProps';
import { exerciseGetByTraining, exerciseStorageDTO } from '../../storage';
import { AppError } from '../../utils';
import { useGym } from '../../hooks/useGym';

import ArrowDownImg from '../../assets/down.png';
import ArrowUpImg from '../../assets/up.png';

import { ButtonTraining, DivisionArea, EmptyArea, Division } from './styled';

interface RouteParamsProps {
  trainingName: string;
}

export const MyExerciseOpen = () => {
  const route = useRoute();
  const _gym = useGym();
  const navigate = useNavigation();
  const { trainingName } = route.params as RouteParamsProps;

  const [divisions, setDivisions] = useState<divisionProps[] | null>(null);
  const [load, setLoad] = useState<boolean>(false);
  
  console.log(divisions)
  const fetchTraining = async () => {
    try {
      setLoad(true);
      
      const data: exerciseStorageDTO[] = await exerciseGetByTraining(trainingName);

      if (data) {
        setDivisions(data[0].divisions);
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

  const handleGoback = () => {
    navigate.goBack();
  }

  useEffect(() => {
    fetchTraining();
  }, []);/* continuar aquiiii fazer a parto de dropdown dos treino */

  return (
    <Container titleText={`Treino de(a) ${trainingName}`}>
      <Main gap={16}>
        <DivisionArea>
          {divisions?.map((item) => {
            return (
              <Division>
                <Text text={item.division} fs={24} nol={1} />

                <Image
                  source={ArrowDownImg}
                  contentFit='cover'
                  style={{ width: 32, height: 32 }}
                />
              </Division>
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