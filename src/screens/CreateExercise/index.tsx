import { Container, Main, AreaInput, Input, ButtonDivision, ButtonDivisionTxt, AreaDivision, Division, Divisions, DivisionButton, DivisionButtonTxt, DivisionButtonDelete } from './styled';
import { Header } from '../../components/Header';
import { useContext, useState } from 'react';
import { Menu } from '../../components/Menu';
import { GymContext } from '../../context/gymContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert, FlatList, Text } from 'react-native';
import { Image } from 'expo-image';
import TrashImg from '../../assets/trashWhite.png';
import { AppError } from '../../utils/appError';

interface RouteParamsProps {
  trainingName: string,
}

export const CreateExercise = () => {
  const { showMenu } = useContext(GymContext);
  const route = useRoute();
  const { trainingName } = route.params as RouteParamsProps;

  const [divisionNames, setDivisionNames] = useState<string[]>([]);
  const [name, setName] = useState<string>('');

  const handleCreateDivisionName = () => {
    setDivisionNames(state => [...state, name]);
    setName('');
  }

  const deleteDivision = async (name: string) => {
    try {
      const filterDivision = divisionNames.filter(item => item !== name);
      setDivisionNames(filterDivision);
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

  return (
    <Container>
      <Header title='Criar divisão e exercícios' />
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
            data={divisionNames}
            extraData={(item: string) => item}
            renderItem={({ item }) => (
              <Division>
                <Divisions>
                  <DivisionButton>
                    <DivisionButtonTxt>{item}</DivisionButtonTxt>
                  </DivisionButton>
                </Divisions>

                <DivisionButtonDelete onPress={() => handleDeleteDivision(item)}>
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
      </Main>
    </Container>
  );
}