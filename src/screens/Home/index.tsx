import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { Container} from '../../components/Container';

import HomeImg from '../../assets/home.png';

import { ButtonExercise } from './styled';

export const Home = () => {
  const { navigate } = useNavigation();

  return (
    <Container titleText='Home'>
      <Main ai='center'gap={24}>
        <Image source={HomeImg} style={{ width: 132, height: 132, marginTop: 120 }} />
        <Text text='Transforme cada esforço em conquista e cada dia em progresso.' fs={18} ta='center' />
        <ButtonExercise onPress={() => navigate('exercise')}>
          <Text text='Selecione um exercício' fs={18} nol={1} />
        </ButtonExercise>
      </Main>
    </Container>
  );
}