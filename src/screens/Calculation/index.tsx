import { Alert } from 'react-native';
import { useContext, useState } from 'react';

import { Input} from '../../components/Input';
import { Container} from '../../components/Container';
import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { ButtonCreate } from '../../components/ButtonCreate';

import { GymContext } from '../../context/gymContext';

import { DivInput, Label, Form } from './styled';

export const Calculation = () => {
  const _gym = useContext(GymContext);

  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [idealWeight, setIdealWeight] = useState<string>('');
  const [resultImc, setResultImc] = useState<number | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);
  const [rightWeight, setRightWeight] = useState<boolean>(false);

  const handleCalculateImc = () => {
    if (weight === '' || height === '') {
      return Alert.alert("Error", "Informe o peso e a altura!");
    }

    const weightNumber = parseFloat(weight.replace(',', '.'));
    const heightNumber = parseFloat(height.replace(',', '.'));

    const valueIMC = calculateIMC(weightNumber, heightNumber);
    setResultImc(valueIMC);

    const textIMC = verifyIMC(valueIMC);
    setResultText(textIMC);

    const valueIdealWeight = calculateIdealWeight(heightNumber);
    setIdealWeight(valueIdealWeight.toString());
  }

  const calculateIMC = (weightValue: number, heightValue: number): number => {
    const imc = weightValue / (heightValue * heightValue);
    return imc;
  }

  const calculateIdealWeight = (heightValue: number): number => {
    return Math.abs(Math.floor(heightValue - 100 - ((heightValue - 150) / 4)));
  }

  const verifyIMC = (value: number): string => {
    let text = '';
    if (value < 18.5) {
      text = 'Seu peso está muito baixo';
      setRightWeight(true);
      return text;
    } else if (value >= 18.5 && value <= 24.9) {
      text = 'Seu peso está normal';
      setRightWeight(false);
      return text;
    } else if (value >= 25 && value <= 29.9) {
      text = 'Você está com sobrepeso';
      setRightWeight(true);
      return text;
    } else if (value >= 30 && value <= 34.9) {
      text = 'Você está com obesidade grau I';
      setRightWeight(true);
      return text;
    } else if (value >= 35 && value <= 39.9) {
      text = 'Você está com obesidade grau II';
      setRightWeight(true);
      return text;
    } else {
      text = 'Você está com obesidade grau III';
      setRightWeight(true);
      return text;
    }
  }

  return (
    <Container titleText='Calculo IMC'>
      <Main>
        <Form>
          <DivInput>
            <Label>
              <Text text='Informe o peso' fs={18} cl={_gym.COLORS.GRAY_100} />
              <Input
                fs={18} h={36} w={150} br={4} pl={8}
                placeholder='Quilo'
                keyboardType='number-pad'
                onChangeText={setWeight}
                value={weight}
                maxLength={8}
              />
            </Label>

            <Label>
              <Text text='Informe o peso' fs={18} cl={_gym.COLORS.GRAY_100} />
              <Input
                fs={18} h={36} w={150} br={4} pl={8}
                placeholder='1.85cm'
                keyboardType='number-pad'
                onChangeText={setHeight}
                value={height}
                maxLength={8}
              />
            </Label>
          </DivInput>

          <ButtonCreate
            bg={_gym.COLORS.GREEN_600} fs={32} fw={700}
            text='Calcular'
            onPress={handleCalculateImc}
          />
        </Form>
        {resultImc &&
          <>
            <Text text={`imc = ${resultImc.toFixed(2)}`} fs={18} cl={_gym.COLORS.GRAY_100} />
            <Text text={resultText != null ? resultText : ''} fs={18} cl={_gym.COLORS.GRAY_100} />
          </>
        }
        {rightWeight &&
          <Text text={`Peso ideal para você: ${idealWeight} KG`} fs={18} cl={_gym.COLORS.GRAY_100} />
        }
      </Main>
    </Container>
  );
}