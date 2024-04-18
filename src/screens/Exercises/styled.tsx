import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonProps } from '../../interfaces/buttonProps';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }: any) => theme.COLORS.ZINC_800};
`;

export const Main = styled.View`
  flex: 1;
  width: 100%;
  padding: 16px;
  gap: 12px;
`;

export const AreaButtonBody = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const ButtonBody = styled.TouchableOpacity<ButtonProps>`
  padding: 2px 14px;
  border-radius: 4px;
  margin-right: 16px;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_100};;
`;

export const ButtonBodyTxt = styled.Text`
  font-size: 18px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;