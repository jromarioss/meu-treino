import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: any) => theme.COLORS.ZINC_800};
`;

export const Main = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding-top: 100px;
`;