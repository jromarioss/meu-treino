import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, BackHandler } from 'react-native';

import { useGym } from '../../hooks/useGym';

import { ButtonCloseModal } from "../ButtonCloseModal";

import { MenuContainer, Button, ButtonText } from './styled';

export const Menu = () => {
  const _gym = useGym();
  const { navigate } = useNavigation();

  const buttons = [
    { label: 'Home', value: 'home' },
    { label: 'Exercícios', value: 'exercise' },
    { label: 'Criar Treino', value: 'createTraining' },
    { label: 'Meus Treinos', value: 'myExercise' },
    { label: 'Calculo IMC', value: 'calculation' },
    { label: 'Pix', value: 'pix' },
    { label: 'Sair', value: 'exit' },
  ]

  const handleGoTo = (goTo: string) => {
    _gym.onShowMenu(!_gym.showMenu);

    if (goTo == 'home') {
      navigate('home',);
    } else if (goTo == 'exercise') {
      navigate('exercise');
    } else if (goTo == 'createTraining') {
      navigate('createTraining');
    } else if (goTo == 'myExercise') {
      navigate('myExercise');
    } else if (goTo == 'calculation') {
      navigate('calculation')
    } else if (goTo == 'pix') {
      _gym.onSetPix(true);
      navigate('home');
    } else {
      BackHandler.exitApp();
    }
  }

  const handleMenu = () => {
    _gym.onShowMenu(!_gym.showMenu);
  }

  useEffect(() => {
    if (_gym.showMenu) {
      Keyboard.dismiss();
    }
  }, []);

  return (
    <MenuContainer>
      <ButtonCloseModal t={36} r={8} cl={'white'} onPress={handleMenu} />

      {buttons.map((button, index) => {
        return (
          <Button key={index} onPress={() => handleGoTo(button.value)}>
            <ButtonText>{button.label}</ButtonText>
          </Button>
        )
      })}
    </MenuContainer>
  );
}