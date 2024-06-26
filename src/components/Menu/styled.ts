import styled from 'styled-components/native';
import { ButtonProps } from '../../interfaces/buttonProps';
import { SafeAreaView } from 'react-native-safe-area-context';

export const MenuContainer = styled(SafeAreaView)`
  width: 100%;
  height: 110%;
  align-items: center;
  justify-content: center;
  gap: 54px;
  position: absolute;
  z-index: 100;
  background-color: ${({ theme }: any) => theme.COLORS.ZINC_700};
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
  padding: 3px 12px;
`;

export const ButtonText = styled.Text`
  font-size: 24px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;