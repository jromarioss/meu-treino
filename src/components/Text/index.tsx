import { ContainerTitle } from './styled';

interface TextProps {
  fx1?: number | undefined,
  fs: number,
  nol?: number,
  fw?: number,
  text: string | undefined,
  cl: string,
  ta?: string,
}

export const Text = ({ text, fs, fw, cl, ta, fx1, nol }: TextProps) => {
  return (
    <ContainerTitle numberOfLines={nol} style={{
      flex: fx1,
      fontSize: fs,
      fontWeight: fw,
      color: `${cl}`,
      textAlign: `${ta}`
    }}>
      {text}
    </ContainerTitle>
  );
}