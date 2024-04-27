import dayjs from 'dayjs';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { Container, Text, ButtonCreate } from '../../components';

import { useGym } from '../../hooks/useGym';
import { AppError } from '../../utils/appError';
import { trainingCreate } from '../../storage/training/trainingCreate';
import { trainingStorageDTO } from '../../storage/training/trainingStorageDTO';

import { AreaInput, Input, Main } from './styled';
import { theme } from '../../styles/theme';

export const CreateTrainingName = () => {
  const _gym = useGym();
  const { navigate } = useNavigation();
  const { COLORS } = theme;

  const [name, setName] = useState<string>('');

  const handleSaveName = async () => {
    try {
      if (name == '') {
        return Alert.alert('Error', 'Seu treino precisa ter um nome.');
      }

      const nameFormated = name.trim();
      const newDate = dayjs(new Date()).format('DD/MM/YYYY');

      const newTraining: trainingStorageDTO = {
        createdAt: newDate,
        name: nameFormated,
      }

      _gym.onSetTrainingName(nameFormated);
      await trainingCreate(newTraining);

      setName('');
      navigate('createTraining', { name: nameFormated });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Deletar treino', error.message);
      } else {
        Alert.alert('Deletar treino', 'Não foi possível criar um traino.');
      }
    }
  }

  return (
    <Container titleText='Criar nome para o treino'>
      <Main>
        <AreaInput>
          <Text text='Informe um nome para o seu treino.' fs={18} cl={COLORS.GRAY_100} />
          <Input
            onChangeText={setName}
            value={name}
            maxLength={30}
          />
        </AreaInput>

        <ButtonCreate
          text='Salvar'
          bg={COLORS.GREEN_600}
          fs={32}
          fw={700}
          op={handleSaveName}
        />
      </Main>
    </Container>
  );
}