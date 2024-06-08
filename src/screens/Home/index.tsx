import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { ModalPix } from './components/ModalPix';
import { Container} from '../../components/Container';

import { useGym } from '../../hooks/useGym';

import HomeImg from '../../assets/home.png';

import { ButtonExercise } from './styled';


export const Home = () => {
  const { navigate } = useNavigation();
  const { pix, onSetPix } = useGym();

  const handleCloseModalPix = () => {
    onSetPix(false);
  }

  return (
    <Container titleText='Home'>
      {pix ?
        <ModalPix onClose={handleCloseModalPix} />
        :
        <Main ai='center'gap={24}>
          <Image source={HomeImg} style={{ width: 132, height: 132, marginTop: 120 }} />
          <Text text='Transforme cada esforço em conquista e cada dia em progresso.' fs={18} ta='center' />
          <ButtonExercise onPress={() => navigate('exercise')}>
            <Text text='Selecione um exercício' fs={18} nol={1} />
          </ButtonExercise>
        </Main>
      }
    </Container>
  );
}