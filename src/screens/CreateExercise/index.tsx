import { Container, Main, AreaButtonBody, AreaExercise, ButtonBody, ButtonBodyTxt, ButtonExercise, ButtonExerciseTxt, DivisionNameTxt, ButtonFinish, ButtonFinishtxt } from './styled';
import { Header } from '../../components/Header';
import { useContext, useState } from 'react';
import { exercise } from '../../utils/exercises';
import { Menu } from '../../components/Menu';
import { GymContext } from '../../context/gymContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ExerciseProps, exerciseTypesProps } from '../../interfaces/exerciseProps';
import { FlatList, Text } from 'react-native';
import { partOfBody } from '../../utils/partOfBody';
import { theme } from '../../styles/theme';
import { ModalExercise } from './components/ModalExercise';
import { divisionProps, exercisesProps } from '../../interfaces/divisionProps';

interface RouteParamsProps {
  divisionName: string,
}
/* lembrar finalizar a parte de adicione exerciios na divisao e depois salvar */
export const CreateExercise = () => {
  const { showMenu } = useContext(GymContext);
  const navigate = useNavigation();
  const route = useRoute();
  const { divisionName } = route.params as RouteParamsProps;

  const [buttonSelected, setButtonSelected] = useState<string | null>(null);
  const [exerciseSelected, setExerciseSelected] = useState<ExerciseProps | null>(null);
  const [exerciseArray, setExerciseArray] = useState<exercisesProps[]>([]);
  const [exerciseToAdd, setExerciseToAdd] = useState<divisionProps | null>(null);
  const [modalExercise, setModalExercise] = useState<boolean>(false);
  const [exerciseSelectedToModal, setExerciseSelectedToModal] = useState<exerciseTypesProps | null>(null);

  const handleSelectBody = (value: string) => {
    const findExercise = exercise.find(item => item.title === value);

    if (findExercise) {
      setExerciseSelected(findExercise)
    }

    setButtonSelected(value);
  }

  const handleOpenModalExercise = (value: exerciseTypesProps) => {
    setExerciseSelectedToModal(value);
    setModalExercise(true);
  }

  const handleAddExerciseArray = (value: exercisesProps) => {
    setExerciseArray(state => [...state, value])
  }
  console.log('exerciseArray: ', exerciseArray);

  const handleCloseModalExercise = () => {
    setModalExercise(false);
    
    //aqui ele nao chega o item atualizado que é o add exercise
  }
  
  const handleAddExercisesToDivision = () => {
    //onCleanExercise();
    const newExercise: divisionProps = {
      division: divisionName,
      exercises: exerciseArray,
    }
    console.log('newExercise: ', newExercise);
  }

  return (
    <Container>
      <Header title='Adicionar exercícios' />
      {showMenu && <Menu />}

      <Main>
        {modalExercise ?
          <ModalExercise
            exercise={exerciseSelectedToModal}
            onExercise={handleAddExerciseArray}
            onClose={handleCloseModalExercise}
          />
          :
          <>
            <DivisionNameTxt>{exerciseArray.length} {exerciseArray.length > 1 ? 'exercícios' : 'exercicio'} adicionado na {divisionName}</DivisionNameTxt>
            <AreaButtonBody>
              <FlatList
                data={partOfBody}        
                extraData={(item: string) => item}
                renderItem={({ item }) => (
                  <ButtonBody
                    onPress={() => handleSelectBody(item)}
                    style={{ borderColor: buttonSelected === item ? theme.COLORS.GREEN_400 : theme.COLORS.GRAY_100 }}
                  >
                    <ButtonBodyTxt>{item}</ButtonBodyTxt>
                  </ButtonBody>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </AreaButtonBody>

            <AreaExercise>
              <FlatList
                data={exerciseSelected?.types}       
                extraData={(item: exerciseTypesProps) => item}
                renderItem={({ item }) => (
                  <ButtonExercise onPress={() => handleOpenModalExercise(item)}>
                    <ButtonExerciseTxt>{item.exercise}</ButtonExerciseTxt>
                  </ButtonExercise>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </AreaExercise>
          </>
        }

        <ButtonFinish onPress={handleAddExercisesToDivision}>
          <ButtonFinishtxt>Finalizar</ButtonFinishtxt>
        </ButtonFinish>
      </Main>
    </Container>
  );
}