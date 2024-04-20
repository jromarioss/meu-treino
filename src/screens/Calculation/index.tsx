import { Container, Main, Input, DivInput, Label, LabelText, ButtonCalculate, ButtonText, Form } from './styled';
import { Header } from '../../components/Header';
import { useContext, useState } from 'react';
import { Menu } from '../../components/Menu';
import { GymContext } from '../../context/gymContext';
import { Alert } from 'react-native'

export const Calculation = () => {
  const { showMenu } = useContext(GymContext);

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
    <Container>
      <Header title='Calculo IMC' />
      {showMenu && <Menu />}

      <Main>
        <Form>
          <DivInput>
            <Label>
              <LabelText>Informe o peso</LabelText>
              <Input
                placeholder='Quilo'
                keyboardType='number-pad'
                onChangeText={setWeight}
                value={weight}
                maxLength={8}
              />
            </Label>

            <Label>
              <LabelText>Informe a altura</LabelText>
              <Input
                placeholder='1.85cm'
                keyboardType='number-pad'
                onChangeText={setHeight}
                value={height}
                maxLength={8}
              />
            </Label>
          </DivInput>

          <ButtonCalculate onPress={handleCalculateImc}>
            <ButtonText>Calcular</ButtonText>
          </ButtonCalculate>
        </Form>
        {resultImc &&
          <>
            <LabelText>imc = {resultImc.toFixed(2)}</LabelText>
            <LabelText>{resultText}</LabelText>
           
          </>
        }
        {rightWeight && 
          <LabelText>Peso ideal para você: {idealWeight} KG</LabelText>
        }
      </Main>
    </Container>
  )
}