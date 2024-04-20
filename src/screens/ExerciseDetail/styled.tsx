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
  align-items: center;
  padding: 16px;
  gap: 16px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 32px;
  text-align: center;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const AreaImage = styled.View`
  width: 250px;
  height: 212px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
`;

export const AreaText = styled.View`
  width: 100%;
  gap: 8px;
`;

export const InfoText = styled.Text`
  font-size: 16px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const ButtonBack = styled.TouchableOpacity<ButtonProps>`
  padding: 6px 32px;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_100};
  border-radius: 8px;
`;

export const ButtonBackTxt = styled.Text`
  font-size: 24px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;