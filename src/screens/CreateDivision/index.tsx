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

interface RouteParamsProps {
  divisionName: string,
}

export const CreateDivision = () => {
  const _gym = useGym();
  const { navigate } = useNavigation();
  const route = useRoute();
  const { divisionName } = route.params as RouteParamsProps;

  const [divisions, setDivisions] = useState<divisionProps[]>([]);
  const [name, setName] = useState<string>('');
  const [blockBtnFinish, setBlockBtnFinish] = useState<boolean>(true);
  console.log(divisions)
  const handleCreateDivisionName = () => {
    if (name === '') {
      return Alert.alert('Error', 'Você precisa dar um nome para sua divisão.');
    }

    if (divisions.length > 3) {
      setName('');
      return Alert.alert('Error', 'Cada treino pode ter no maxímo 4 divisões.');
    }

    const divisionExists = divisions.find(item => item.division === name);

    if (divisionExists) {
      setName('');
      return Alert.alert('Error', 'Já existe um divísão com esse nome.');
    }

    const newDivision: divisionProps = {
      division: name.trim(),
      exercises: [],
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
      Alert.alert('Deletar divisão', 'Divisão deletada com sucesso.');
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
    navigate('createExercise', { divisionName: name });
    _gym.onCleanDoubtType();
  }

  const saveDivision = async (data: exerciseStorageDTO) => {
    try {
      console.log(data)

      await exerciseCreate(data, _gym.trainingName);

      _gym.onCleanTrainingName();
      _gym.onCleanDivisionDatas();
      _gym.onCleanDoubtType();

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
      const hasDivisionDatas = divisions.some(item => item.division.length > 0);
      if (hasDivisionDatas) {
        setBlockBtnFinish(false)
      } else {
        setBlockBtnFinish(true);
      }
    }
  }, [_gym.divisionDatas, setBlockBtnFinish]);
  // deixa para fazer aqu idepois que é a parte de criar divisão 

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

        <ButtonCreate
          bg={_gym.COLORS.GREEN_600} fs={32} fw={700}
          text='Finalizar'
          onPress={handleSaveDivision}
          disabled={blockBtnFinish}
        />
      </Main>
    </Container>
  );
}