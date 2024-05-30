import styled from 'styled-components/native';

export const Div = styled.View`
  flex: 1;
`;

export const ButtonArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;

export const ButtonTraining = styled.TouchableOpacity`
  flex: 1;
  height: 58px;
  justify-content: center;
  padding-left: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const EmptyArea = styled.View`
  flex: 1;
  height: 500px;
  align-items: center;
  justify-content: center;
`;