import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 500px;
  padding: 16px;
  z-index: 2;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.COLORS.ZINC_600};
`;

export const AreaImage = styled.View`
  width: 264px;
  height: 236px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_800};
`;

export const Form = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
`;

export const LabelArea = styled.View`
  flex: 1;
`;

export const AreaFlat = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 16px;
`;

export const ExerciseDiv = styled.View`
  width: 100%;
  height: 48px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
  padding-left: 12px;
  border-bottom-width: 1px;
  border-color: ${({ theme }: any) => theme.COLORS.GRAY_800};
`;