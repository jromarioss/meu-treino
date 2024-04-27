import { Image } from 'expo-image';

import TrashBackImg from '../../assets/trashBlack.png';
import TrashWhiteImg from '../../assets/trashWhite.png';

import { ContainerButton } from './styled';

interface TitleProps {
  w: number,
  h: number,
  iw: number,
  ih: number,
  ic: 'white' | 'black',
  bg?: string,
  op: () => void,
}

export const ButtonDelete = ({ w, h, iw, ih, ic, op, bg }: TitleProps) => {
  return (
    <ContainerButton onPress={op} style={{
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