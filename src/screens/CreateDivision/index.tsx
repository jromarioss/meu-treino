import { Alert, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Container, ButtonDelete, Text, ButtonCreate } from '../../components';

import { AppError } from '../../utils/appError';
import { divisionWithTrueProps } from '../../interfaces/divisionProps';
import { exerciseStorageDTO } from '../../storage/exercise/exerciseStorageDTO';
import { exerciseCreate } from '../../storage/exercise/exerciseCreate';
import { useGym } from '../../hooks/useGym';


import { Main, AreaInput, Input, AreaDivision, Division, Divisions, DivisionButton, DivisionTxt } from './styled';
import { theme } from '../../styles/theme';

interface RouteParamsProps {
  divisionName: string,
}

export const CreateDivision = () => {
  const _gym = useGym();
  const navigate = useNavigation();
  const route = useRoute();
  const { divisionName } = route.params as RouteParamsProps;
  const { COLORS } = theme;

  const [division, setDivision] = useState<divisionWithTrueProps[]>([]);
  const [name, setName] = useState<string>('');
  const [blockBtnFinish, setBlockBtnFinish] = useState<boolean>(true);

  const handleCreateDivisionName = () => {
    const divisionExists = division.find(item => item.division === name);

    if (divisionExists) {
      Alert.alert('Error', 'Já existe um divísão com esse nome.');
      setName('');
      return;
    }

    const newDivision: divisionWithTrueProps = {
      division: name,
      exercises: [],
      showExercise: false,
    }

    setDivision(state => [...state, newDivision]);
    setName('');
  }

  const handleSaveDivision = async () => {
    try {
      const id = String(new Date().getTime())

      const newExercise: exerciseStorageDTO = {
        id: id,
        training: _gym.trainingName,
        divisions: _gym.divisionDatas,
      }
      console.log(newExercise);//hoje fazer a parte de pegar o treino criado e salva no contexto o training name pq ele fica undefined sempre
      //await exerciseCreate(newExercise, trainingName);
      //navigate.navigate('home');
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Não foi possível criar está divisão.');
      }
    }
  }

  const deleteDivision = async (name: string) => {
    try {
      const filterDivision = division.filter(item => item.division !== name);
      setDivision(filterDivision);
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
    navigate.navigate('createExercise', { divisionName: name })
  }

  const loadExerciseData = () => {
    // const updateDivision = division.map(item => {
    //   if (item.division === divisionName) {
    //     return { ...item, showExercise: true }
    //   }
    //   return item;
    // });

    // setDivision(updateDivision);
  }

  useEffect(() => {
    _gym.onSetDoubtType('Create division');
  }, []);

  useEffect(() => {
    if (_gym.divisionDatas.length > 0) {
      const hasDivisionDatas = division.some(item => item.division.length > 0);
      if (hasDivisionDatas) {
        setBlockBtnFinish(false)
      } else {
        setBlockBtnFinish(true);
      }
    }
  }, [_gym.divisionDatas, setBlockBtnFinish]);
  // deixa para fazer aqu idepois que é a parte de criar divisão 
  useEffect(() => {
    loadExerciseData();
  }, [divisionName]);

  return (
    <Container titleText='Criar divisão' doubt>
      <Main>
        <AreaInput>
          <Input
            placeholder='Nome da divisão'
            onChangeText={setName}
            value={name}
            maxLength={24}
          />

          <ButtonCreate
            w={100}
            h={42}
            text='Criar'
            bg={COLORS.GREEN_600}
            fs={24}
            fw={700}
            op={handleCreateDivisionName}
          />
        </AreaInput>

        <AreaDivision>
          <FlatList 
            data={division}
            extraData={(item: divisionWithTrueProps) => item}
            renderItem={({ item }) => (
              <Division>
                <Divisions>
                  <DivisionButton onPress={() => handleGoToExercises(item.division)}>
                    <Text text={item.division} fs={24} cl={COLORS.GRAY_100} nol={1} />
                  </DivisionButton>
                  {item.showExercise &&
                    <Text
                      text={`${_gym.divisionDatas.length} ${division.length < 1 ? 'exercício' : 'exercícios'}`}
                      fs={14}
                      cl={COLORS.GRAY_100}
                    />
                  }
                </Divisions>

                <ButtonDelete
                  op={() => handleDeleteDivision(item.division)}
                  h={36}
                  w={36}
                  ic='white'
                  ih={16}
                  iw={16}
                  bg={COLORS.RED_600}
                />
              </Division>
            )}
          />
        </AreaDivision>

        <ButtonCreate
          text='Finalizar'
          bg={COLORS.GREEN_600}
          fs={32}
          fw={700}
          op={handleSaveDivision}
          ds={blockBtnFinish}
        />
      </Main>
    </Container>
  );
}