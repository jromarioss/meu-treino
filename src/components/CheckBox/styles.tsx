import styled from 'styled-components/native';
import { ButtonProps } from '../../interfaces/buttonProps';

export const CheckBoxContainer = styled.TouchableOpacity<ButtonProps>`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_100};
`;