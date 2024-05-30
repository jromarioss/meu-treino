import { TouchableOpacityProps } from 'react-native';

import { Image } from 'expo-image';

import TrashBackImg from '../../assets/trashBlack.png';
import EditImg from '../../assets/edit.png';
import PlusImg from '../../assets/plus.png';
import TrashWhiteImg from '../../assets/trashWhite.png';

import { ContainerButton } from './styled';

interface TitleProps extends TouchableOpacityProps {
  w: number;
  h: number;
  iw: number;
  ih: number;
  ic: 'white' | 'black';
  bg?: string;
  ei?: boolean;
  plus?: boolean;
}

export const ButtonCustom = ({ w, h, iw, ih, ic, bg, ei, plus, ...rest }: TitleProps) => {
  return (
    <ContainerButton {...rest} style={{
      width: w,
      height: h,
      backgroundColor: bg,
    }}>
      {ei ?
        <Image
          source={EditImg}
          contentFit='cover'
          style={{ width: iw, height: ih }}
        />
        :
        plus ?
        <Image
          source={PlusImg}
          contentFit='cover'
          style={{ width: iw, height: ih }}
        />
        :
        <Image
          source={ic === 'black' ? TrashBackImg : TrashWhiteImg}
          contentFit='cover'
          style={{ width: iw, height: ih }}
        />
      }
    </ContainerButton>
  );
}