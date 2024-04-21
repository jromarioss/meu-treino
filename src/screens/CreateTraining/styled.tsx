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
  justify-content: flex-end;
  padding: 16px;
  gap: 24px;
`;

export const TrainingArea = styled.View`
  width: 100%;
  height: 200px;
  flex: 1;
`;

export const TrainingTxt = styled.Text`
  font-size: 28px;
  text-align: center;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const Div = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const TrainingDiv = styled.View`
  flex: 1;
  height: 64px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonTraining = styled.TouchableOpacity<ButtonProps>`
  flex: 1;
`;

export const ButtonTrainingTxt = styled.Text`
  font-size: 24px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const DataTxt = styled.Text`
  font-size: 16px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const ButtonDelete = styled.TouchableOpacity<ButtonProps>`
  width: 36px;
  height: 36px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`;

export const ButtonCreate = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  height: 64px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.COLORS.GREEN_500};
`;

export const ButtonCreateTxt = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;