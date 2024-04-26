import { Container, Main, AreaInput, Input, ButtonDivision, ButtonDivisionTxt, AreaDivision, Division, Divisions, DivisionButton, DivisionButtonTxt, DivisionButtonDelete, ButtonFinish, ButtonFinishTxt, DivisionTxt } from './styled';
import { Header } from '../../components/Header';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';
import { GymContext } from '../../context/gymContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert, FlatList } from 'react-native';
import { Image } from 'expo-image';
import TrashImg from '../../assets/trashWhite.png';
import { AppError } from '../../utils/appError';
import { divisionWithTrueProps } from '../../interfaces/divisionProps';
import { ModalDoubt } from './components/ModalDoubt';
import { exerciseStorageDTO } from '../../storage/exercise/exerciseStorageDTO';
import { exerciseCreate } from '../../storage/exercise/exerciseCreate';

interface RouteParamsProps {
  trainingName: string,
  divisionName: string,
}

export const CreateDivision = () => {
  const { showMenu, divisionDatas } = useContext(GymContext);
  const navigate = useNavigation();
  const route = useRoute();
  const { trainingName, divisionName } = route.params as RouteParamsProps;

  const [division, setDivision] = useState<divisionWithTrueProps[]>([]);
  const [name, setName] = useState<string>('');
  const [blockBtnFinish, setBlockBtnFinish] = useState<boolean>(true);
  const [modalDoubt, setModalDoubt] = useState<boolean>(false);

  const handleCreateDivisionName = () => {
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
        training: trainingName,
        divisions: divisionDatas,
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
    Alert.alert('Deletar divisão', 'Deseja deletar este divisão?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => deleteDivision(name) }
    ]);
  }

  const handleGoToExercises = (name: string) => {
    navigate.navigate('createExercise', { divisionName: name })
  }

  const handleOpenModalDoubt = () => {
    setModalDoubt(false);
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
    if (divisionDatas.length > 0) {
      const hasDivisionDatas = division.some(item => item.division.length > 0);
      if (hasDivisionDatas) {
        setBlockBtnFinish(false)
      } else {
        setBlockBtnFinish(true);
      }
    }
  }, [divisionDatas, setBlockBtnFinish]);

  useEffect(() => {
    loadExerciseData();
  }, [divisionName]);

  return (
    <Container>
      <Header title='Criar divisão' />
      {showMenu && <Menu />}

      <Main>
        <AreaInput>
          <Input
            placeholder='Nome da divisão'
            onChangeText={setName}
            value={name}
            maxLength={20}
          />

          <ButtonDivision onPress={handleCreateDivisionName}>
            <ButtonDivisionTxt>Criar</ButtonDivisionTxt>
          </ButtonDivision>
        </AreaInput>

        <AreaDivision>
          <FlatList 
            data={division}
            extraData={(item: divisionWithTrueProps) => item}
            renderItem={({ item }) => (
              <Division>
                <Divisions>
                  <DivisionButton onPress={() => handleGoToExercises(item.division)}>
                    <DivisionButtonTxt>{item.division}</DivisionButtonTxt>
                  </DivisionButton>
                  {item.showExercise &&
                    <DivisionTxt>{divisionDatas.length} {division.length < 1 ? 'exercício' : 'exercícios'}</DivisionTxt>
                  }
                </Divisions>

                <DivisionButtonDelete onPress={() => handleDeleteDivision(item.division)}>
                  <Image
                    source={TrashImg}
                    contentFit='cover'
                    style={{ width: 28, height: 28 }}
                  />
                </DivisionButtonDelete>
              </Division>
            )}
          />
        </AreaDivision>

        {modalDoubt && 
          <ModalDoubt />
        }

        {division.length > 0 ?
          <ButtonFinish onPress={handleSaveDivision} type='primary' disabled={blockBtnFinish}>
            <ButtonFinishTxt>Finalizar</ButtonFinishTxt>
          </ButtonFinish>
          :
          <ButtonFinish onPress={handleOpenModalDoubt} type='secondary'>
            <ButtonFinishTxt>Como criar divisão</ButtonFinishTxt>
          </ButtonFinish>
        }
      </Main>
    </Container>
  );
}