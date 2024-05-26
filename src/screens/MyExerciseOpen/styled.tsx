import styled from 'styled-components/native';

export const DivisionArea = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const DivisionOutSide = styled.View`
  width: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const Division = styled.View`
  width: 100%;
  height: 58px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
`;

export const DivisionDroped = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  border-top-width: 1px;
  gap: 12px;
  border-color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const DivisionButtonDrop = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
`;

export const ButtonExercises = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px 8px 16px;
`;

export const EmptyArea = styled.View`
  flex: 1;
  height: 500px;
  align-items: center;
  justify-content: center;
`;