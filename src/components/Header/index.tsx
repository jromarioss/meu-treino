import { Image,  } from 'react-native';

import { Text } from '../Text';

import { useGym } from '../../hooks/useGym';

import arrowLeftImg from '../../assets/arrowLeft.png';
import BackImg from '../../assets/back.png';

import { theme } from '../../styles/theme';
import { Container, ButtonMenu, ButtonDoubt, ButtonDoubtTxt, MenuBarra } from './styled';

type HeaderProps = {
  title: string,
  hasButtonBack?: boolean,
  hasButtonDoubt?: boolean,
}

export const Header = ({ title, hasButtonBack, hasButtonDoubt }: HeaderProps) => {
  const _gym = useGym();
  const { COLORS } = theme;

  const handleMenu = () => {
    _gym.onShowMenu(!_gym.showMenu);

    if (_gym.showDoubt) {
      _gym.onSetShowDoubt(false);
    }
  }

  const handleDoubt = () => {
    _gym.onSetShowDoubt(!_gym.showDoubt);
  }

  return (
    <Container>
      <ButtonMenu onPress={handleMenu}>
        <MenuBarra />
        <MenuBarra />
        <MenuBarra />
      </ButtonMenu>
      <Text fx1={1} cl={COLORS.GRAY_50} fs={24} text={title} ta='center' />

      {hasButtonBack &&
        <Image source={arrowLeftImg} />
      }

      {hasButtonDoubt &&
        <ButtonDoubt onPress={handleDoubt}>
          <ButtonDoubtTxt>?</ButtonDoubtTxt>
        </ButtonDoubt>
      }
    </Container>
  );
}