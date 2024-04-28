import { TextInputProps } from 'react-native';

import { ContainerInput } from './styled';

interface InputProps extends TextInputProps {
  w?: number | string,
  h: number,
  fx1?: number | undefined,
  fs: number,
  pl: number,
  br: number,
  bg: string,
}

export const Input = ({ w, h, fx1, fs, pl, br, bg, ...rest }: InputProps) => {
  return (
    <ContainerInput
      {...rest}
      style={{
        flex: fx1,
        width: w,
        height: h,
        paddingLeft: pl,
        backgroundColor: bg,
        fontSize: fs,
        borderRadius: br,
      }}
    />
  );
}