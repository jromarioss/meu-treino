import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

import { Container} from '../../components/Container';
import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { ButtonCreate } from '../../components/ButtonCreate';
import { ButtonCustom } from '../../components/ButtonCustom';
import { Input } from '../../components/Input';

import { useGym } from '../../hooks/useGym';
import { AppError } from '../../utils/appError';
import { divisionProps } from '../../interfaces/divisionProps';
import { exerciseCreate } from '../../storage/exercise/exerciseCreate';
import { exerciseStorageDTO } from '../../storage/exercise/exerciseStorageDTO';

import { AreaInput, AreaDivision, Division, Divisions, DivisionButton } from './styled';

interface formData {
  name: string;
}

export const CreateDivision = () => {
  const _gym = useGym();
  const { navigate } = useNavigation();

  const { control, handleSubmit, reset } = useForm<formData>({
    defaultValues: {
      name: ''
    }
  });

  const [divisions, setDivisions] = useState<divisionProps[]>([]);
  const [showButtonFinish, setShowButtonFinish] = useState<boolean>(false);

  const handleCreateDivisionName = ({ name }: formData) => {
    if (divisions.length > 4) {
      reset();
      return Alert.alert('Error', 'Cada treino pode ter no maxímo 5 divisões.');
    }

    const divisionExists = divisions.find(item => item.division === name);

    if (divisionExists) {
      reset();
      return Alert.alert('Error', 'Já existe uma divisão com este nome.');
    }

    const newDivision: divisionProps = {
      division: name.trim(),
      exercises: [],
    }

    setDivisions(state => [...state, newDivision]);
    _gym.onSetDivisionDatas(newDivision);

    reset();
  }

  const deleteDivision = (name: string) => {
    _gym.onRemoveDivisionDatas(name);

    const filterDivision = divisions.filter(item => item.division !== name);
    setDivisions(filterDivision);
  }

  const handleDeleteDivision = (name: string) => {
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
      const noExerciseEmpty: boolean = data.divisions.every((item: divisionProps) => item.exercises.length > 0)

      if (!noExerciseEmpty) {
        return Alert.alert('Error', 'Cada divisão precisa ter pelo menos um exercício!')
      }

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

  const handleSaveDivision = () => {
    const id = String(new Date().getTime())

    const newExercise: exerciseStorageDTO = {
      id: id,
      training: _gym.trainingName,
      divisions: _gym.divisionDatas,
    }

    Alert.alert('Divisão', `Deseja salvar?`, [
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
          <Controller
            control={control}
            name='name'
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value }}) => (
              <Input
                fx1={1} h={42} fs={18} br={6} pl={8}
                placeholder='Nome da divisão'
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleCreateDivisionName)}
                maxLength={18}
              />
            )}
          />

          <ButtonCreate
            w={100} h={42} bg={_gym.COLORS.GREEN_600} fs={24} fw={700}
            text='Criar'
            onPress={handleSubmit(handleCreateDivisionName)}
          />
        </AreaInput>

        <AreaDivision>
          {divisions.map((item, index) => {
            return (
              <Division key={index}>
                <Divisions>
                  <DivisionButton onPress={() => handleGoToExercises(item.division)}>
                    <Text text={item.division} fs={24} cl={_gym.COLORS.GRAY_100} nol={1} />
                  </DivisionButton>
                </Divisions>

                <ButtonCustom
                  h={36} w={36} ih={16} iw={16}
                  ic='white'
                  onPress={() => handleDeleteDivision(item.division)}
                  bg={_gym.COLORS.RED_600}
                />
              </Division>
            )
          })}
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