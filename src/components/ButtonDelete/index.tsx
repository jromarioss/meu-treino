import { TouchableOpacityProps } from 'react-native';

import { Image } from 'expo-image';

import TrashBackImg from '../../assets/trashBlack.png';
import TrashWhiteImg from '../../assets/trashWhite.png';

import { ContainerButton } from './styled';

interface TitleProps extends TouchableOpacityProps {
  w: number,
  h: number,
  iw: number,
  ih: number,
  ic: 'white' | 'black',
  bg?: string,
}

export const ButtonDelete = ({ w, h, iw, ih, ic, bg, ...rest }: TitleProps) => {
  return (
    <ContainerButton {...rest} style={{
      width: w,
      height: h,
      backgroundColor: bg,
    }}>
      <Image
        source={ic === 'black' ? TrashBackImg : TrashWhiteImg}
        contentFit='cover'
        style={{ width: iw, height: ih }}
      />
    </ContainerButton>
  );
}