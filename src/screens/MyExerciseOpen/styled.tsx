import styled from 'styled-components/native';

export const ButtonTraining = styled.TouchableOpacity`
  height: 64px;
  justify-content: center;
  padding-left: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const DivisionArea = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyArea = styled.View`
  flex: 1;
  height: 500px;
  align-items: center;
  justify-content: center;
`;