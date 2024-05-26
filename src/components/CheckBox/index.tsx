import { TouchableOpacityProps, Image } from 'react-native';

import { useGym } from '../../hooks/useGym';

import CheckWhiteImg from '../../assets/checkWhite.png';
import CloseImg from '../../assets/closeImg.png';

import { CheckBoxContainer } from './styles';

interface CheckBoxProps extends TouchableOpacityProps {
  onIsCheck: boolean | undefined;
  w: number;
  h: number;
  wi: number;
  hi: number;
}

export const CheckBox = ({ onIsCheck, w, h, wi, hi, ...rest }: CheckBoxProps) => {
  const _gym = useGym();

  return (
    <CheckBoxContainer {...rest} style={{
      width: w,
      height: h,
      backgroundColor: onIsCheck ? _gym.COLORS.GREEN_600 : _gym.COLORS.RED_600
    }}>
      {onIsCheck ? 
        <Image source={CheckWhiteImg} style={{ width: wi, height: hi }} />
        :
        <Image source={CloseImg} style={{ width: wi, height: hi }} />
      }
    </CheckBoxContainer>
  )
}