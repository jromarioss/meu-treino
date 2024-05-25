import { TouchableOpacityProps, Image } from 'react-native';

import CheckBackImg from '../../assets/checkBlack.png';

import { CheckBoxContainer } from './styles';

interface CheckBoxProps extends TouchableOpacityProps {
  onIsCheck: boolean | undefined;
}

export const CheckBox = ({ onIsCheck, ...rest }: CheckBoxProps) => {
  return (
    <CheckBoxContainer {...rest}>
      {onIsCheck ? 
        <Image source={CheckBackImg} style={{ width: 28, height: 28 }} />
        :
        <></>
      }
    </CheckBoxContainer>
  )
}