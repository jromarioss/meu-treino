import { Image,  } from 'react-native';
import { Container, Title, ButtonMenu } from './styled';
import menuImg from '../../assets/menu.png';
import arrowLeftImg from '../../assets/arrowLeft.png';
import { useContext } from 'react';
import { GymContext } from '../../context/gymContext';

type HeaderProps = {
  title: string,
  hasButtonBack?: boolean,
}

export const Header = ({ title, hasButtonBack }: HeaderProps) => {
  const { showMenu, onShowMenu } = useContext(GymContext);

  const handleMenu = () => {
    onShowMenu(!showMenu);
  }

  return (
    <Container>
      <ButtonMenu onPress={handleMenu}>
        <Image source={menuImg} />
      </ButtonMenu>
      <Title>{title}</Title>

      {hasButtonBack &&
        <Image source={arrowLeftImg} />
      }
    </Container>
  )
}