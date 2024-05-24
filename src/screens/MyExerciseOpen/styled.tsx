import styled from 'styled-components/native';

export const DivisionArea = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const Division = styled.View`
  width: 300px;
  height: 58px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-left: 16px;
  padding-right: 16px;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_100};
  border-radius: 8px;
`;

export const ButtonTraining = styled.TouchableOpacity`
  height: 64px;
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