import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonProps } from '../../interfaces/buttonProps';

export const Container = styled(SafeAreaView)`
  width: 100%;
  height: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${({ theme }: any) => theme.COLORS.ZINC_700};
`;

export const Title = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 24px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_50};
`;

export const ButtonMenu = styled.TouchableOpacity<ButtonProps>`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_200};
  border-radius: 6px;
`;