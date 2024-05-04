import dayjs from 'dayjs';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container, Text, ButtonCreate, Input, Main } from '../../components';

import { useGym } from '../../hooks/useGym';
import { AppError } from '../../utils/appError';
import { trainingCreate, trainingStorageDTO } from '../../storage';

import { AreaInput } from './styled';

export const CreateTrainingName = () => {
  const _gym = useGym();
  const { navigate } = useNavigation();

  const [name, setName] = useState<string>('');

  const handleSaveName = async () => {
    try {
      if (name === '') {
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
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Não foi possível criar um traino.');
      }
    }
  }

  return (
    <Container titleText='Criar treino'>
      <Main gap={24} jc='space-between'>
        <AreaInput>
          <Text text='Informe um nome para o seu treino.' fs={18} cl={_gym.COLORS.GRAY_100} />
          <Input
            fs={18} bg={_gym.COLORS.GRAY_100} h={42} w='100%' br={4} pl={16}
            onChangeText={setName}
            value={name}
            maxLength={30}
          />
        </AreaInput>

        <ButtonCreate
          bg={_gym.COLORS.GREEN_600} fs={32} fw={700}
          text='Salvar'
          onPress={handleSaveName}
        />
      </Main>
    </Container>
  );
}