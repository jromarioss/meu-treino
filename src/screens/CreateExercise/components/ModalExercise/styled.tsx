import styled from 'styled-components/native';
import { ButtonProps } from '../../../../interfaces/buttonProps';

export const Container = styled.View`
  height: 600px;
  width: 100%;
  padding: 16px;
  z-index: 2;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const ButtonClose = styled.TouchableOpacity<ButtonProps>`
  padding: 10px;
  position: absolute;
  top: 2px;
  right: 2px;
`;

export const Main = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  margin-top: 16px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
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

export const LabelText = styled.Text`
  font-size: 18px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_800};
`;

export const LabelStrongText = styled(LabelText)`
  font-weight: 700;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 44px;
  padding-left: 8px;
  font-size: 20px;
  background-color: white;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_800};;
  border-radius: 4px;
`;

export const ButtonFinish = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  height: 54px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.COLORS.GREEN_500};
`;

export const ButtonFinishtxt = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const ExerciseDiv = styled.View`
  width: 100%;
  height: 48px;
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: ${({ theme }: any) => theme.COLORS.GRAY_800};
`;

export const ExerciseText = styled.Text`
  flex: 1;
  font-size: 16px;
  color: ${({ theme }: any) => theme.COLORS.GRAY_800};
`;

export const ExerciseBtDelete = styled.TouchableOpacity<ButtonProps>`
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
`;