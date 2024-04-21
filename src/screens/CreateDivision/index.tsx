import { Container, Main, AreaInput, Input, ButtonDivision, ButtonDivisionTxt, AreaDivision, Division, Divisions, DivisionButton, DivisionButtonTxt, DivisionButtonDelete, ButtonFinish, ButtonFinishTxt } from './styled';
import { Header } from '../../components/Header';
import { useContext, useState } from 'react';
import { Menu } from '../../components/Menu';
import { GymContext } from '../../context/gymContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert, FlatList, Text } from 'react-native';
import { Image } from 'expo-image';
import TrashImg from '../../assets/trashWhite.png';
import { AppError } from '../../utils/appError';
import { divisionProps } from '../../interfaces/divisionProps';

interface RouteParamsProps {
  trainingName: string,
}

export const CreateDivision = () => {
  const { showMenu } = useContext(GymContext);
  const navigate = useNavigation();
  const route = useRoute();
  const { trainingName } = route.params as RouteParamsProps;

  const [division, setDivision] = useState<divisionProps[]>([]);
  const [name, setName] = useState<string>('');
  const [blockBtnFinish, setBlockBtnFinish] = useState<boolean>(true);

  const handleCreateDivisionName = () => {
    const newDivision: divisionProps = {
      division: name,
      exercises: [],
    }
    setDivision(state => [...state, newDivision]);
    setName('');
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
            extraData={(item: divisionProps) => item}
            renderItem={({ item }) => (
              <Division>
                <Divisions>
                  <DivisionButton onPress={() => handleGoToExercises(item.division)}>
                    <DivisionButtonTxt>{item.division}</DivisionButtonTxt>
                  </DivisionButton>
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

        {division.length > 0 &&
          <ButtonFinish disabled={blockBtnFinish}>
            <ButtonFinishTxt>Finalizar</ButtonFinishTxt>
          </ButtonFinish>
        }
      </Main>
    </Container>
  );
}