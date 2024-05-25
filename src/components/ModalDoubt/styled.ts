import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 16px;
  gap: 1px;
  background-color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;