import styled from 'styled-components/native';
import { ButtonProps } from '../../interfaces/buttonProps';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: any) => theme.COLORS.ZINC_800};
`;

export const Main = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 16px;
  gap: 16px;
`;

export const ButtonDivisionName = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  align-items: center;
  padding: 10px 4px;
  border-radius: 8px;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const DivisionNameTxt = styled.Text`
  font-size: 18px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

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

export const ButtonBodyTxt = styled.Text`
  font-size: 18px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
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

export const ButtonExerciseTxt = styled.Text`
  font-size: 24px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const ButtonFinish = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  height: 54px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.COLORS.GREEN_500};
`;

export const ButtonFinishtxt = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;