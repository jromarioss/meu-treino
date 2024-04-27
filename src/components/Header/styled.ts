import styled from 'styled-components/native';
import { ButtonProps } from '../../interfaces/buttonProps';

export const Container = styled.View`
  width: 100%;
  height: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${({ theme }: any) => theme.COLORS.ZINC_700};
`;

export const ButtonMenu = styled.TouchableOpacity<ButtonProps>`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_200};
  border-radius: 6px;
`;

export const ButtonDoubt = styled.TouchableOpacity<ButtonProps>`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }: any) => theme.COLORS.GRAY_200};
  border-radius: 6px;
`;

export const ButtonDoubtTxt = styled.Text`
  font-size: 32px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_800};
`;