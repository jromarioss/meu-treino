import styled from 'styled-components/native';
import { ButtonProps } from '../../../../interfaces/buttonProps';

export const Container = styled.View`
  width: 100%;
  height: 372px;
  padding: 16px;
  z-index: 2;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.COLORS.ZINC_600};
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  gap: 16px;
`;

export const HourArea = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 4px 32px;
  gap: 8px;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme.COLORS.ZINC_700};
`;

export const DotArea = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const Dot = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background-color: ${({ theme }: any) => theme.COLORS.GREEN_600};
`;

export const ButtonTimeArea = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonTime = styled.TouchableOpacity<ButtonProps>`
  padding: 4px 10px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid transparent;
`;