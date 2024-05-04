import { TextInputProps } from 'react-native';

import { useGym } from '../../hooks/useGym';
import { ContainerInput } from './styled';

interface InputProps extends TextInputProps {
  w?: number | string,
  h: number,
  fx1?: number | undefined,
  fs: number,
  pl: number,
  br: number,
  bg?: string,
  bw?: number,
  bc?: string,
}

export const Input = ({ w, h, fx1, fs, pl, br, bg, bw, bc, ...rest }: InputProps) => {
  const _gym = useGym();
  return (
    <ContainerInput
      {...rest}
      style={{
        flex: fx1,
        width: w,
        height: h,
        paddingLeft: pl,
        backgroundColor: bg ? bg : _gym.COLORS.GRAY_100,
        fontSize: fs,
        borderRadius: br,
        borderWidth: bw,
        borderColor: bc,
      }}
    />
  );
}