import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: any) => theme.COLORS.ZINC_800};
`;

export const LoadIndicator = styled.ActivityIndicator.attrs(({ theme }: any) => ({
  color: theme.COLORS.GREEN_600,
}))``;