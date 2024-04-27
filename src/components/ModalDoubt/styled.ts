import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 16px;
  gap: 16px;
  background-color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const Main = styled.View`
  flex: 1;
  width: 300px;
`;