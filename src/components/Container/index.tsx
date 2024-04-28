import { ReactNode } from 'react';

import { Header, Menu, ModalDoubt } from '../';

import { useGym } from '../../hooks/useGym';

import { MainContainer } from './styled';

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