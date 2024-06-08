import { Image } from 'expo-image';

import { Main } from '../../../../components/Main';
import { Text } from '../../../../components/Text';
import { ButtonCloseModal } from '../../../../components/ButtonCloseModal';

import { useGym } from '../../../../hooks/useGym';

import HomeImg from '../../../../assets/home.png';

import { Container } from './styled';

interface ModalPixProps {
  onClose: () => void,
}

export const ModalPix = ({ onClose }: ModalPixProps) => {
  const _gym = useGym();

  return (
    <Container>
      <ButtonCloseModal t={1} r={1} cl={'black'} onPress={onClose} />

      <Main ai='center' gap={12} >
        <Text text='Créditos' mt={16} ta='center' fs={24} fw={700} cl={_gym.COLORS.GRAY_100} />

        <Text
          text='Todas as informações e funcionalidades presentes no aplicativo é ofertado de maneira gratuita desde 2024!'
          ta='center' fs={16} cl={_gym.COLORS.GRAY_100}
        />
        <Text
          text='Você pode me ajudar a manter o aplicativo com um simples PIX de qualquer valor, use o e-mail abaixo como chave pix.'
          ta='center' fs={16} cl={_gym.COLORS.GRAY_100}
        />
        <Text
          text='Desenvolvedor: José Romário S.Santos'
          ta='center' fs={16} cl={_gym.COLORS.GRAY_100}
        />
        <Text
          text='Chave PIX: jromario2014@gmail.com'
          ta='center' fs={16} fw={700} cl={_gym.COLORS.GRAY_100}
        />

        <Image source={HomeImg} style={{ width: 100, height: 100, marginTop: 32 }} />
      </Main>
    </Container>
  );
}