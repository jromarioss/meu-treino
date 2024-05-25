import styled from 'styled-components/native';
import { ButtonProps } from '../../interfaces/buttonProps';

export const AreaImage = styled.View`
  width: 200px;
  height: 182px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
`;

export const AreaInfos = styled.View`
  width: 100%;
  height: 32px;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;

export const AreaInfosText = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const AreaButtons = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonSerie = styled.TouchableOpacity<ButtonProps>`
  width: 232px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }: any) => theme.COLORS.GRAY_100};
`;

export const AreaText = styled.ScrollView`
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;