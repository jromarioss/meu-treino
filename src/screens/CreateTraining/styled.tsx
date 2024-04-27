import styled from 'styled-components/native';
import { ButtonProps } from '../../interfaces/buttonProps';

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

export const Div = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
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

export const ButtonDelete = styled.TouchableOpacity<ButtonProps>`
  width: 36px;
  height: 36px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`;