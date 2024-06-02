import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

import { Main } from '../../../../components/Main';
import { Text } from '../../../../components/Text';
import { ButtonCreate } from '../../../../components/ButtonCreate';
import { ButtonCloseModal } from '../../../../components/ButtonCloseModal';

import { useGym } from '../../../../hooks/useGym';
import { Cycles } from '../../../../interfaces/cycles';

import { Container, Form, HourArea, DotArea, Dot, ButtonTime, ButtonTimeArea } from './styled';

interface ModalRestPros {
  onClose: () => void;
}

export const ModalRest = ({ onClose }: ModalRestPros) => {
  const _gym = useGym();

  const [cycle, setCycle] = useState<Cycles | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);
  const [timeSelected, setTimeSelected] = useState<number>(0);
  const [buttonSelected, setButtonSelected] = useState<number>(0);
  const [isCount, setIsCount] = useState<boolean>(false);

  const totalSeconds: number = cycle ? cycle.minutesAmount * 60 : 0;
  const currentSeconds: number = cycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount: number = Math.floor(currentSeconds / 60);
  const secondsAmount: number = currentSeconds % 60;

  const minutes: string = String(minutesAmount).padStart(2, '0');
  const seconds: string = String(secondsAmount).padStart(2, '0');

  const handleGetTime = (timeSelected: number, buttonSelected: number) => {
    setTimeSelected(timeSelected);
    setButtonSelected(buttonSelected);
  }

  const createNewCycle = (minutesAmount: number) => {
    const newCycle: Cycles = {
      minutesAmount: minutesAmount,
      startDate: new Date()
    }

    setCycle(newCycle);
    setAmountSecondsPassed(0);
    setIsCount(true);
  }

  const handleReset = () => {
    setCycle(null);
    setButtonSelected(0);
    setIsCount(false);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | number;

    if (cycle) {
      interval = setInterval(() => {
        const secondsDifference: number = differenceInSeconds(new Date, cycle.startDate);

        if (secondsDifference >= totalSeconds) {
          setCycle(null);
          setButtonSelected(0);
          setIsCount(false);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    }
  }, [cycle, totalSeconds, setAmountSecondsPassed, setCycle, setIsCount, setButtonSelected]);

  return (
    <Container>
      <ButtonCloseModal t={1} r={1} cl={'black'} onPress={onClose} />

      <Main jc='space' ai='center' gap={16} pd={0} >
        <Text text='Descanso' fs={32} ta='center' fw={700} />
        <Form>
          <HourArea>
            <Text text={minutes} fs={64} ta='center' fw={700} />
            <DotArea>
              <Dot />
              <Dot />
            </DotArea>
            <Text text={seconds} fs={64} ta='center' fw={700} />
          </HourArea>

          <ButtonTimeArea>
            <ButtonTime
              onPress={() => handleGetTime(1, 1)}
              style={{
                borderColor: buttonSelected === 1 ? _gym.COLORS.GREEN_700 : _gym.COLORS.GRAY_100
              }}
              disabled={isCount}
            >
              <Text text='01:00' fs={24} />
            </ButtonTime>
            <ButtonTime
              onPress={() => handleGetTime(1.5, 2)}
              style={{
                borderColor:  buttonSelected === 2 ? _gym.COLORS.GREEN_700 : _gym.COLORS.GRAY_100
              }}
              disabled={isCount}
            >
              <Text text='01:30' fs={24} />
            </ButtonTime>
            <ButtonTime
              onPress={() => handleGetTime(2, 3)}
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
          bg={_gym.COLORS.GREEN_700}
          text='Iniciar'
          onPress={() => createNewCycle(timeSelected)}
          disabled={isCount}
        />
        
        <ButtonCreate
          bg={_gym.COLORS.GREEN_700}
          text='Resetar'
          onPress={handleReset}
        />
      </Main>
    </Container>
  );
}