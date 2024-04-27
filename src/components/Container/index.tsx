import { ReactNode } from 'react';
import { MainContainer } from './styled';
import { Header } from '../Header';
import { Menu } from '../Menu';
import { ModalDoubt } from '../ModalDoubt';
import { useGym } from '../../hooks/useGym';

interface CreateDivisionProps {
  children: ReactNode,
  titleText: string,
  doubt?: boolean,
}

export const Container = ({ children, titleText, doubt }: CreateDivisionProps) => {
  const _gym = useGym();

  return (
    <MainContainer>
      <Header title={titleText} hasButtonDoubt={doubt}  />
      {_gym.showMenu && <Menu />}
      {_gym.showDoubt && <ModalDoubt />}
      {children}
    </MainContainer>
  );
}