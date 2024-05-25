import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Container} from '../../components/Container';
import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { ButtonCreate } from '../../components/ButtonCreate';
import { ButtonDelete } from '../../components/ButtonDelete';
import { Input } from '../../components/Input';

import { useGym } from '../../hooks/useGym';
import { AppError } from '../../utils/appError';
import { divisionProps } from '../../interfaces/divisionProps';
import { exerciseCreate } from '../../storage/exercise/exerciseCreate';
import { exerciseStorageDTO } from '../../storage/exercise/exerciseStorageDTO';

import { AreaInput, AreaDivision, Division, Divisions, DivisionButton } from './styled';

export const CreateDivision = () => {
  const _gym = useGym();
  const { navigate } = useNavigation();

  const [divisions, setDivisions] = useState<divisionProps[]>([]);
  const [name, setName] = useState<string>('');
  const [showButtonFinish, setShowButtonFinish] = useState<boolean>(false);

  const handleCreateDivisionName = () => {
    if (name === '') {
      return Alert.alert('Error', 'Você precisa dar um nome para sua divisão.');
    }

    if (divisions.length > 4) {
      setName('');
      return Alert.alert('Error', 'Cada treino pode ter no maxímo 5 divisões.');
    }

    const divisionExists = divisions.find(item => item.division === name);

    if (divisionExists) {
      setName('');
      return Alert.alert('Error', 'Já existe um divisão com esse nome.');
    }

    const newDivision: divisionProps = {
      division: name.trim(),
      exercises: [],
      done: false,
    }

    setDivisions(state => [...state, newDivision]);
    _gym.onSetDivisionDatas(newDivision);

    setName('');
  }

  const deleteDivision = async (name: string) => {
    try {
      _gym.onRemoveDivisionDatas(name);

      const filterDivision = divisions.filter(item => item.division !== name);
      setDivisions(filterDivision);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Deletar divisão', error.message);
      } else {
        Alert.alert('Deletar divisão', 'Não foi possível deletar essa divisão.');
      }
    }
  }

  const handleDeleteDivision= async (name: string) => {
    Alert.alert('Deletar divisão', `Deseja deletar a divisão ${name}?`, [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => deleteDivision(name) }
    ]);
  }

  const handleGoToExercises = (name: string) => {
    _gym.onCleanDoubtType();
    navigate('createExercise', { divisionName: name });
  }

  const saveDivision = async (data: exerciseStorageDTO) => {
    try {
      await exerciseCreate(data, _gym.trainingName);

      _gym.onCleanTrainingName();
      _gym.onCleanDivisionDatas();
      _gym.onCleanDoubtType();
      setDivisions([]);

      navigate('home');
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Não foi possível criar está divisão.');
      }
    }
  }

  const handleSaveDivision = async () => {
    const id = String(new Date().getTime())

    const newExercise: exerciseStorageDTO = {
      id: id,
      training: _gym.trainingName,
      divisions: _gym.divisionDatas,
    }

    Alert.alert('Divisão', `Deseja finalizar a criação de divisão?`, [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => saveDivision(newExercise) }
    ]);
  }

  useEffect(() => {
    _gym.onSetDoubtType('Create division');
  }, []);

  useEffect(() => {
    if (_gym.divisionDatas.length > 0) {
      const hasExerciseOnDivisionDatas: boolean = _gym.divisionDatas.some(item => item.exercises.length > 0)

      if (hasExerciseOnDivisionDatas) {
        setShowButtonFinish(true);
      } else {
        setShowButtonFinish(false);
      }
    }
  }, [_gym.divisionDatas, setShowButtonFinish]);

  return (
    <Container titleText='Criar divisão' doubt>
      <Main gap={16} ai='center'>
        <AreaInput>
          <Input
            fx1={1} h={42} fs={18} br={6} pl={8}
            placeholder='Nome da divisão'
            onChangeText={setName}
            value={name}
            maxLength={24}
          />

          <ButtonCreate
            w={100} h={42} bg={_gym.COLORS.GREEN_600} fs={24} fw={700}
            text='Criar'
            onPress={handleCreateDivisionName}
          />
        </AreaInput>

        <AreaDivision>
          <FlatList 
            data={divisions}
            extraData={(item: divisionProps) => item}
            renderItem={({ item }) => (
              <Division>
                <Divisions>
                  <DivisionButton onPress={() => handleGoToExercises(item.division)}>
                    <Text text={item.division} fs={24} cl={_gym.COLORS.GRAY_100} nol={1} />
                  </DivisionButton>
                </Divisions>

                <ButtonDelete
                  h={36} w={36} ih={16} iw={16}
                  ic='white'
                  onPress={() => handleDeleteDivision(item.division)}
                  bg={_gym.COLORS.RED_600}
                />
              </Division>
            )}
          />
        </AreaDivision>

        {showButtonFinish &&
          <ButtonCreate
            bg={_gym.COLORS.GREEN_600} fs={32} fw={700}
            text='Finalizar'
            onPress={handleSaveDivision}
          />
        }
      </Main>
    </Container>
  );
}