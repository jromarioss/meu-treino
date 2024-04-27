import styled from 'styled-components/native';
import { ButtonProps } from '../../interfaces/buttonProps';

export const ContainerButton = styled.TouchableOpacity<ButtonProps>`
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;