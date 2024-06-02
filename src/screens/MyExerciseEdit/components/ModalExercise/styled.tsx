import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 500px;
  padding: 16px;
  z-index: 2;
  position: absolute;
  top: 16px;
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