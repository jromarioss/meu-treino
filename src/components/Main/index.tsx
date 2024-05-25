import { ReactNode } from 'react';

import { MainContainer } from './styled';

interface MainProps {
  children: ReactNode,
  w?: number;
  gap?: number;
  ai?: string;
  jc?: string;
  mb?: number;
  pd?: number;
}

export const Main = ({ children, w, gap, pd, ai, jc, mb }: MainProps) => {

  return (
    <MainContainer style={{
      width: w ?? '100%',
      gap: gap,
      alignItems: ai,
      justifyContent: jc,
      padding: pd ?? 16,
      marginBottom: mb,
    }}>
      {children}
    </MainContainer>
  );
}