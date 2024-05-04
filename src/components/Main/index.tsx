import { ReactNode } from 'react';

import { MainContainer } from './styled';

interface MainProps {
  children: ReactNode,
  gap?: number,
  ai?: string,
  jc?: string,
  mb?: number,
}

export const Main = ({ children, gap, ai, jc, mb }: MainProps) => {

  return (
    <MainContainer style={{
      gap: gap,
      alignItems: ai,
      justifyContent: jc,
      marginBottom: mb,
    }}>
      {children}
    </MainContainer>
  );
}