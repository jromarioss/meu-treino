import { TextInputProps } from 'react-native';

import styled from 'styled-components/native';

export const ContainerInput = styled.TextInput<TextInputProps>`
  width: 100%;
  height: 42px;
  padding-left: 16px;
  font-size: 18px;
  background-color: white;
  border-radius: 4px;
`;