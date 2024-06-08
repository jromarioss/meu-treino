import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 500px;
  padding: 16px;
  z-index: 2;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.COLORS.ZINC_600};
`;