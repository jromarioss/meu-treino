import styled from 'styled-components/native';
import { ButtonProps } from '../../interfaces/buttonProps';

export const AreaButtonBody = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const ButtonBody = styled.TouchableOpacity<ButtonProps>`
  padding: 2px 14px;
  border-radius: 4px;
  margin-right: 16px;
  border: 2px solid transparent;
`;

export const AreaExercise = styled.View`
  flex: 1;
  gap: 12px;
`;

export const ButtonExercise = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  padding: 10px 0px;
  margin-bottom: 16px;
  border-bottom-width: 1px;
  border-color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;