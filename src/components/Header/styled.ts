import styled from 'styled-components/native';
import { ButtonProps } from '../../interfaces/buttonProps';

export const Container = styled.View`
  width: 100%;
  height: 84px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${({ theme }: any) => theme.COLORS.ZINC_700};
`;

export const ButtonMenu = styled.TouchableOpacity<ButtonProps>`
  width: 44px;
  height: 44px;
  gap: 6px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }: any) => theme.COLORS.GREEN_600};
  border-radius: 6px;
`;

export const MenuBarra = styled.View`
  width: 24px;
  height: 3px;
  border-radius: 2px;
  background-color: ${({ theme }: any) => theme.COLORS.GREEN_600};
`;

export const ButtonDoubt = styled.TouchableOpacity<ButtonProps>`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }: any) => theme.COLORS.GREEN_700};
  border-radius: 6px;
`;

export const ButtonDoubtTxt = styled.Text`
  font-size: 32px;
  color: ${({ theme }: any) => theme.COLORS.GREEN_700};
`;