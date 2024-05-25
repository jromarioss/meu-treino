import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

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
        cl={`${_gym.COLORS.GRAY_800}`}
      />

      <Main>
        <FlatList
          data={doubtInfoData?.infos.texts}
          extraData={(item: string) => item}
          renderItem={({ item, index }: any) => (
            <Text
              key={item}
              text={`${index + 1} - ${item}`}
              fs={18}
              cl={`${_gym.COLORS.GRAY_800}`}
            />
          )}
        />
      </Main>
    </Container>
  );
}