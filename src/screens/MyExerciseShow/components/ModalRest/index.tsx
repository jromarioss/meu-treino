import { useEffect, useState } from 'react';

import { Main } from '../../../../components/Main';
import { ButtonCloseModal } from '../../../../components/ButtonCloseModal';

import { useGym } from '../../../../hooks/useGym';
import { Text } from '../../../../components/Text';

import { Container, Form, HourArea, DotArea, Dot, ButtonTime, ButtonTimeArea } from './styled';
import { ButtonCreate } from '../../../../components/ButtonCreate';

interface ModalRestPros {
  onClose: () => void;
}

export const ModalRest = ({ onClose }: ModalRestPros) => {
  const _gym = useGym();

  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [buttonSelected, setButtonSelected] = useState<number>(0);
  const [isCount, setIsCount] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handleSetTime = (timeMinutes: number, timeSeconds: number, buttonSelected: number) => {
    setSeconds(timeSeconds);
    setMinutes(timeMinutes);
    setButtonSelected(buttonSelected);

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsCount(false);
  }

  const handleStartTime = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    
    setIsCount(true);
    
    const newIntervalId = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          if (minutes === 0) {
            clearInterval(newIntervalId);
            setIntervalId(null);
            setIsCount(false);
            setButtonSelected(0);
            return 0;
          } else {
            setMinutes(prevMinutes => prevMinutes - 1);
            return 59;
          }
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    setIntervalId(newIntervalId);
  }

  useEffect(() => {
    if (minutes === 0 && seconds === 0 && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setButtonSelected(0);
      setIsCount(false);
    }
  }, [seconds, minutes, intervalId]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);


  return (
    <Container>
      <ButtonCloseModal t={1} r={1} cl={'black'} onPress={onClose} />

      <Main jc='space' ai='center' gap={16} pd={0} >
        <Text text='Descanso' fs={32} ta='center' fw={700} />
        <Form>
          <HourArea>
            <Text text={minutes.toString().padStart(2, '0')} fs={64} ta='center' fw={700} />
            <DotArea>
              <Dot />
              <Dot />
            </DotArea>
            <Text text={seconds.toString().padStart(2, '0')} fs={64} ta='center' fw={700} />
          </HourArea>

          <ButtonTimeArea>
            <ButtonTime
              onPress={() => handleSetTime(1, 0, 1)}
              style={{
                borderColor: buttonSelected === 1 ? _gym.COLORS.GREEN_700 : _gym.COLORS.GRAY_100
              }}
              disabled={isCount}
            >
              <Text text='01:00' fs={24} />
            </ButtonTime>
            <ButtonTime
              onPress={() => handleSetTime(1, 30, 2)}
              style={{
                borderColor:  buttonSelected === 2 ? _gym.COLORS.GREEN_700 : _gym.COLORS.GRAY_100
              }}
              disabled={isCount}
            >
              <Text text='01:30' fs={24} />
            </ButtonTime>
            <ButtonTime
              onPress={() => handleSetTime(2, 0, 3)}
              style={{
                borderColor:  buttonSelected === 3 ? _gym.COLORS.GREEN_700 : _gym.COLORS.GRAY_100
              }}
              disabled={isCount}
            >
              <Text text='02:00' fs={24} />
            </ButtonTime>
          </ButtonTimeArea>
        </Form>
        <ButtonCreate
          bg={isCount ? _gym.COLORS.RED_700 : _gym.COLORS.GREEN_700} fs={28} fw={700} h={48}
          text='Iniciar'
          onPress={handleStartTime}
          disabled={isCount}
        />

        <ButtonCreate
          bg={_gym.COLORS.GREEN_700} fs={28} fw={700} h={48}
          text='Resetar'
          onPress={() => handleSetTime(0, 0, 0)}
        />
      </Main>
    </Container>
  );
}