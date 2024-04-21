import styled from 'styled-components/native';
import { ButtonProps } from '../../../../interfaces/buttonProps';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const Main = styled.View`
  margin-top: 32px;
  gap: 16px;
`;

export const ButtonClose = styled.TouchableOpacity<ButtonProps>`
  padding: 10px;
  position: absolute;
  top: 2px;
  right: 2px;
`;

export const Form = styled.View`
  width: 100%;
  gap: 6px;
`;

export const LabelText = styled.Text`
  font-size: 18px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_800};
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 44px;
  padding-left: 8px;
  font-size: 20px;
  background-color: white;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_800};;
  border-radius: 4px;
`;

export const InfoText = styled.Text`
  font-size: 18px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_800};
`;

export const ButtonNext = styled.TouchableOpacity<ButtonProps>`
  width: 120px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_800};
`;

export const ButtonNextTxt = styled.Text`
  font-size: 18px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_800};
`;