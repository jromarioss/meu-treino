import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonProps } from '../../interfaces/buttonProps';

export const Container = styled(SafeAreaView)`
  flex: 1;
  position: relative;
  background-color: ${({ theme }: any) => theme.COLORS.ZINC_800};
`;

export const Main = styled.View`
  flex: 1;
  width: 100%;
  padding: 16px;
  gap: 12px;
`;


export const Form = styled.View`
  width: 100%;
  gap: 16px;
  overflow-y: scroll;
`;

export const DivInput = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Label = styled.View`
  
`;

export const LabelText = styled.Text`
  margin-bottom: 4px;
  font-size: 18px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const Input = styled.TextInput`
  width: 150px;
  height: 36px;
  padding-left: 4px;
  font-size: 18px;
  background-color: white;
  border: 1px solid white;
  border-radius: 4px;
`;

export const ButtonCalculate = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  height: 52px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }: any) => theme.COLORS.GRAY_100};
  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  margin-bottom: 4px;
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;