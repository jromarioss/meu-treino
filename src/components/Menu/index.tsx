import { BackHandler, Text } from 'react-native';
import { MenuContainer, Button, ButtonText, ButtonClose, ButtonCloseTxt } from './styled';
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react';
import { GymContext } from '../../context/gymContext';

export const Menu = () => {
  const { onShowMenu, showMenu } = useContext(GymContext);
  const navigate = useNavigation();

  const buttons = [
    { label: 'Home', value: 'home' },
    { label: 'Exercícios', value: 'exercise' },
    { label: 'Montar Treino', value: 'createExercise' },
    { label: 'Meu Treino', value: 'myExercise' },
    { label: 'Calculo IMC', value: 'calculation' },
    { label: 'Sair', value: 'exit' },
  ]

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
    } else if (goTo == 'calculation') {
      navigate.navigate('calculation')
    } else {
      BackHandler.exitApp();
    }
  }

  const handleMenu = () => {
    onShowMenu(!showMenu);
  }

  return (
    <MenuContainer>
      <ButtonClose onPress={handleMenu}>
        <ButtonCloseTxt>x</ButtonCloseTxt>
      </ButtonClose>
      {buttons.map((button, index) => {
        return (
          <Button key={index} onPress={() => handleGoTo(button.value)}>
            <ButtonText>{button.label}</ButtonText>
          </Button>
        )
      })}
    </MenuContainer>
  )
}