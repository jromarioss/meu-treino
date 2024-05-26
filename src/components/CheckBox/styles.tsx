import styled from 'styled-components/native';
import { ButtonProps } from '../../interfaces/buttonProps';

export const CheckBoxContainer = styled.TouchableOpacity<ButtonProps>`
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_100};
`;