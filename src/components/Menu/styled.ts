import styled from 'styled-components/native';
import { ButtonProps } from '../../interfaces/buttonProps';

export const MenuContainer = styled.View`
  width: 250px;
  height: 400px;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ theme }: any) => theme.COLORS.ZINC_600};
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
  padding: 3px 12px;
`;

export const ButtonText = styled.Text`
  font-size: 24px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;