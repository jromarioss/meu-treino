import { Container, Main } from './styled';
import { useEffect, useState } from 'react';
import { Text, Title } from '../';
import { theme } from '../../styles/theme';
import { doubtInfos } from '../../utils/doubtInfos'
import { doubtInfosProps } from '../../interfaces/doubtInfosProps';
import { FlatList } from 'react-native';
import { useGym } from '../../hooks/useGym';

export const ModalDoubt = () => {
  const _gym = useGym();
  const { COLORS } = theme;

  const [doubtInfoData, setDoubtInfoData] = useState<doubtInfosProps | null>(null);

  const fetchDoubt = () => {
    const doubtFilter = doubtInfos.find(item => item.name === _gym.doubtType);

    if (doubtFilter) {
      setDoubtInfoData(doubtFilter)
    }
  }

  useEffect(() => {
    fetchDoubt();
  }, []);

  return (
    <Container>
      <Title text={doubtInfoData?.infos.title} fs={24} fw={700} cl={`${COLORS.GRAY_800}`} />
      <Main>
        <FlatList
          data={doubtInfoData?.infos.texts}
          extraData={(item: string) => item}
          renderItem={({ item, index }: any) => (
            <Text key={item} text={`${index + 1} - ${item}`} fs={18} cl={`${COLORS.GRAY_800}`} />
          )}
        />
      </Main>
    </Container>
  );
}