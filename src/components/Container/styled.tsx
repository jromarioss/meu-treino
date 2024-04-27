import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const MainContainer = styled(SafeAreaView)`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }: any) => theme.COLORS.ZINC_800};
`;