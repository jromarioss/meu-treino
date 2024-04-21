import { BackHandler } from 'react-native';
import { MenuContainer, Button, ButtonText, ButtonClose } from './styled';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { GymContext } from '../../context/gymContext';
import { Keyboard, Image } from 'react-native';
import CloseImg from '../../assets/closeImg.png';

export const Menu = () => {
  const { onShowMenu, showMenu } = useContext(GymContext);
  const navigate = useNavigation();

  const buttons = [
    { label: 'Home', value: 'home' },
    { label: 'Exercícios', value: 'exercise' },
    { label: 'Criar Treino', value: 'createTraining' },
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
    } else if (goTo == 'createTraining') {
      navigate.navigate('createTraining');
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

  useEffect(() => {
    if (showMenu) {
      Keyboard.dismiss();
    }
  }, [])

  return (
    <MenuContainer>
      <ButtonClose onPress={handleMenu}>
        <Image source={CloseImg} />
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