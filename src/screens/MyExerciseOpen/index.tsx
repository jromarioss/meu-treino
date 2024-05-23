import { useContext, useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { ButtonCreate, Container, Main, Text } from '../../components';

import { divisionProps } from '../../interfaces/divisionProps';
import { trainingStorageDTO, trainingGetAll, exerciseGetByTraining, exerciseStorageDTO } from '../../storage';
import { AppError } from '../../utils';

import { ButtonTraining, DivisionArea, EmptyArea } from './styled';
import { useGym } from '../../hooks/useGym';

interface RouteParamsProps {
  trainingName: string;
}

export const MyExerciseOpen = () => {
  const route = useRoute();
  const _gym = useGym();
  const navigate = useNavigation();
  const { trainingName } = route.params as RouteParamsProps;

  const [divisions, setDivisions] = useState<any[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  console.log('caiu aqui: ', divisions)
 
  const fetchTraining = async () => {
    try {
      setLoad(true);

      const data = await exerciseGetByTraining(trainingName);
      setDivisions(data);

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
  }, []);

  return (
    <Container titleText={`Treino de(a) ${trainingName}`}>
      <Main gap={16}>
        <DivisionArea>
          <FlatList
            data={divisions}
            extraData={(item: exerciseStorageDTO) => item}
            renderItem={({ item }) => (
              <ButtonTraining>
                <Text text={item.exercises} fs={24} nol={1} />
              </ButtonTraining>
            )}
            ListEmptyComponent={() => (
              <EmptyArea>
                <Text text="Nenhum treino cadastrardo!" fs={24} nol={1} />
              </EmptyArea>
            )}
          />
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