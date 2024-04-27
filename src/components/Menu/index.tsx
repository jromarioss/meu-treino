import { MenuContainer, Button, ButtonText, ButtonClose } from './styled';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Keyboard, Image, BackHandler } from 'react-native';
import CloseImg from '../../assets/closeImg.png';
import { useGym } from '../../hooks/useGym';

export const Menu = () => {
  const _gym = useGym();
  const { navigate } = useNavigation();

  const buttons = [
    { label: 'Home', value: 'home' },
    { label: 'Exercícios', value: 'exercise' },
    { label: 'Criar Treino', value: 'createTraining' },
    { label: 'Meu Treino', value: 'myExercise' },
    { label: 'Calculo IMC', value: 'calculation' },
    { label: 'Sair', value: 'exit' },
  ]

  const handleGoTo = (goTo: string) => {
    _gym.onShowMenu(!_gym.showMenu);

    if (goTo == 'home') {
      navigate('home');
    } else if (goTo == 'exercise') {
      navigate('exercise');
    } else if (goTo == 'createTraining') {
      navigate('createTraining', {});
    } else if (goTo == 'myExercise') {
      navigate('myExercise');
    } else if (goTo == 'calculation') {
      navigate('calculation')
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
  );
}