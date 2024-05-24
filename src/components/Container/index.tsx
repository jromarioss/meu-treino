import { ReactNode } from 'react';

import { Header } from '../Header';
import { Menu } from '../Menu';
import { ModalDoubt } from '../ModalDoubt';

import { useGym } from '../../hooks/useGym';

import { MainContainer } from './styled';

interface ContainerProps {
  children: ReactNode,
  titleText: string,
  doubt?: boolean,
}

export const Container = ({ children, titleText, doubt }: ContainerProps) => {
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