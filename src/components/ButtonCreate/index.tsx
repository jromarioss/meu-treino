import { TouchableOpacityProps } from 'react-native';

import { Text } from '../Text';

import { ContainerButton } from './styled';
import { theme } from '../../styles/theme';

interface TitleProps extends TouchableOpacityProps {
  text: string,
  bg?: string,
  w?: number,
  h?: number,
  fs: number,
  fw?: number,
}

export const ButtonCreate = ({ text, w, h, fs, fw, bg, ...rest }: TitleProps) => {
  const { COLORS } = theme;

  return (
    <ContainerButton {...rest} style={{
      width: w ? w : '100%',
      height: h ? h : 64,
      backgroundColor: bg ? bg : 'transparent',
    }}>
      <Text text={text} fs={fs} fw={fw} cl={`${COLORS.GRAY_100}`} />
    </ContainerButton>
  );
}