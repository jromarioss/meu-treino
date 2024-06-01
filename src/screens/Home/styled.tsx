import styled from 'styled-components/native';

export const ButtonExercise = styled.TouchableOpacity`
  padding: 12px 16px 12px 16px;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_100};
`;