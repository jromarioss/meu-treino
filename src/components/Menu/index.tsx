import { BackHandler } from 'react-native';
import { MenuContainer, Button, ButtonText } from './styled';
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react';
import { GymContext } from '../../context/gymContext';

export const Menu = () => {
  const { onShowMenu, showMenu } = useContext(GymContext);

  const navigate = useNavigation();

  const handleGoTo = (goTo: string) => {
    onShowMenu(!showMenu);
    if (goTo == 'home') {
      navigate.navigate('home');
    } else if (goTo == 'exercise') {
      navigate.navigate('exercise');
    } else if (goTo == 'createExercise') {
      navigate.navigate('createExercise');
    } else if (goTo == 'myExercise') {
      navigate.navigate('myExercise');
    } else {
      BackHandler.exitApp();
    }
  }

  return (
    <MenuContainer>
      <Button onPress={() => handleGoTo('home')}>
        <ButtonText>Home</ButtonText>
      </Button>

      <Button onPress={() => handleGoTo('exercise')}>
        <ButtonText>Exercício</ButtonText>
      </Button>

      <Button onPress={() => handleGoTo('createExercise')}>
        <ButtonText>Montar Treino</ButtonText>
      </Button>

      <Button onPress={() => handleGoTo('myExercise')}>
        <ButtonText>Meu Treino</ButtonText>
      </Button>

      <Button onPress={() => handleGoTo('exit')}>
        <ButtonText>Sair</ButtonText>
      </Button>
    </MenuContainer>
  )
}