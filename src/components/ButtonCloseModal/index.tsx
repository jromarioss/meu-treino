import { TouchableOpacityProps, Image } from 'react-native';

import CloseBlackImg from '../../assets/closeBack.png';
import CloseWhiteImg from '../../assets/closeImg.png';
import XImg from '../../assets/x.png';

import { ContainerButton } from './styled';

interface ButtonCloseModalProps extends TouchableOpacityProps {
  cl: 'black' | 'white',
  t: number,
  r: number,
}

export const ButtonCloseModal = ({ cl, t, r, ...rest }: ButtonCloseModalProps) => {
  return (
    <ContainerButton {...rest} style={{
      top: t,
      right: r,
    }}>
      <Image source={XImg}/>
    </ContainerButton>
  );
}