import { useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';

import { Text } from '../Text';
import { ButtonCloseModal } from '../ButtonCloseModal';
import { Main } from '../Main';

import { doubtInfos } from '../../utils/doubtInfos'
import { doubtInfosProps } from '../../interfaces/doubtInfosProps';
import { useGym } from '../../hooks/useGym';

import { Container } from './styled';

export const ModalDoubt = () => {
  const _gym = useGym();

  const [doubtInfoData, setDoubtInfoData] = useState<doubtInfosProps | null>(null);

  const fetchDoubt = () => {
    const doubtFilter = doubtInfos.find(item => item.name === _gym.doubtType);

    if (doubtFilter) {
      setDoubtInfoData(doubtFilter)
    }
  }

  const handleDoubt = () => {
    _gym.onSetShowDoubt(!_gym.showDoubt);
  }

  useEffect(() => {
    fetchDoubt();
  }, []);

  return (
    <Container>
      <ButtonCloseModal t={4} r={8} cl={'black'} onPress={handleDoubt} />

      <Text
        text={doubtInfoData?.infos.title}
        mt={18}
        fs={24}
        fw={700}
        ta='center'
        cl={`${_gym.COLORS.GRAY_100}`}
      />

      <ScrollView>
        <Main gap={16}>
          {doubtInfoData?.infos.texts.map((item: any, index: number) => {
            return (
              <Text
                key={index}
                text={`${index + 1} - ${item}`}
                fs={18}
                cl={`${_gym.COLORS.GRAY_100}`}
              />
            )
          })}
        </Main>
      </ScrollView>
    </Container>
  );
}