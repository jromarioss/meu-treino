import { Container, Main, ButtonBody, ButtonBodyTxt, AreaButtonBody } from './styled';
import { Header } from '../../components/Header';
import { useContext } from 'react';
import { Menu } from '../../components/Menu';
import { GymContext } from '../../context/gymContext';
import { FlatList } from 'react-native';

export const Exercises = () => {
  const { showMenu } = useContext(GymContext);

  const partOfBody = ['Costa', 'Peito', 'Perna', 'Bíceps', 'Ombro', 'Tríceps'];

  const handleSelectBody = (value: string) => {
    console.log('fois: ', value)
  }

  return (
    <Container>
      <Header title='Exercícios' />
      {showMenu && <Menu />}

      <Main>
        <AreaButtonBody>
          <FlatList
            data={partOfBody}        
            extraData={(item: any) => item}
            renderItem={({ item }) => (
              <ButtonBody onPress={() => handleSelectBody(item)}>
                <ButtonBodyTxt>{item}</ButtonBodyTxt>
              </ButtonBody>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </AreaButtonBody>
      </Main>
    </Container>
  )
}