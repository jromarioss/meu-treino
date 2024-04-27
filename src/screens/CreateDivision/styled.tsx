import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';
import { ButtonProps } from '../../interfaces/buttonProps'

export const Main = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 16px;
  gap: 16px;
`;

export const AreaInput = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 42px;
  padding-left: 8px;
  font-size: 18px;
  border-radius: 6px;
  background-color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const AreaDivision = styled.View`
  flex: 1;
  width: 100%;
`;

export const Division = styled.View`
  flex-direction: row;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const Divisions = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
  height: 48px;
  align-items: center;
`;

export const DivisionButton = styled.TouchableOpacity<ButtonProps>`
  flex: 1;
  width: 100%;
  height: 42px;
  justify-content: center;
  padding-left: 12px;
`;

export const DivisionTxt = styled.Text`
  font-size: 14px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;