import styled from 'styled-components/native';
import { ButtonProps } from '../../../../interfaces/buttonProps';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;