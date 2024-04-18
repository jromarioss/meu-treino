import { Container } from './styled';
import { Header } from '../../components/Header';
import { useContext } from 'react';
import { Menu } from '../../components/Menu';
import { GymContext } from '../../context/gymContext';

export const Home = () => {
  const { showMenu } = useContext(GymContext);

  return (
    <Container>
      <Header title='Bem Vindo' />
      {showMenu && <Menu />}
    </Container>
  )
}