import { TextProps } from 'react-native';

import { ContainerTitle } from './styled';

interface TitleProps extends TextProps {
  fx1?: number | undefined,
  text: string | undefined,
  fs: number,
  fw?: number,
  cl: string,
  ta?: string,
}

export const Title = ({ text, fs, fw, cl, ta, fx1, ...rest }: TitleProps) => {
  return (
    <ContainerTitle {...rest} style={{
      flex: fx1,
      fontSize: fs,
      fontWeight: fw,
      color: `${cl}`,
      textAlign: `${ta}`,
    }}>
      {text}
    </ContainerTitle>
  );
}