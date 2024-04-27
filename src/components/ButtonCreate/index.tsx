import { ContainerButton } from './styled';
import { Text } from '..';
import { theme } from '../../styles/theme';

interface TitleProps {
  text: string,
  bg: string,
  w?: number,
  h?: number,
  fs: number,
  fw?: number,
  ds?: boolean,
  op: () => void,
}

export const ButtonCreate = ({ text, w, h, fs, fw, op, ds, bg }: TitleProps) => {
  const { COLORS } = theme;

  return (
    <ContainerButton onPress={op} disabled={ds} style={{
      width: w ? w : '100%',
      height: h ? h : 64,
      backgroundColor: bg,
    }}>
      <Text text={text} fs={fs} fw={fw} cl={`${COLORS.GRAY_100}`} />
    </ContainerButton>
  );
}