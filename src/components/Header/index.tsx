import { Image,  } from 'react-native';
import { Container, ButtonMenu, ButtonDoubt, ButtonDoubtTxt } from './styled';
import menuImg from '../../assets/menu.png';
import arrowLeftImg from '../../assets/arrowLeft.png';
import { useGym } from '../../hooks/useGym';
import { Title } from '../'
import { theme } from '../../styles/theme';

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
        <Image source={menuImg} />
      </ButtonMenu>
      <Title fx1={1} cl={COLORS.GRAY_50} fs={24} text={title} ta='center' />

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