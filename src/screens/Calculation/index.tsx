import { useContext, useState } from 'react';
import { Switch } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { Input} from '../../components/Input';
import { Container} from '../../components/Container';
import { Text } from '../../components/Text';
import { Main } from '../../components/Main';
import { ButtonCreate } from '../../components/ButtonCreate';

import { GymContext } from '../../context/gymContext';

import { DivInput, Label, Form, Div, DivSwitch } from './styled';

interface formData {
  weight: string;
  height: string;
}

export const Calculation = () => {
  const _gym = useContext(GymContext);

  const { control, handleSubmit, reset } = useForm<formData>({
    defaultValues: {
      weight: '',
      height: ''
    }
  });

  const [idealWeight, setIdealWeight] = useState<string>('');
  const [resultImc, setResultImc] = useState<number | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);
  const [rightWeight, setRightWeight] = useState<boolean>(false);
  const [isMen, setIsMen] = useState<boolean>(false);

  const toggleSwitch = () => {
    setIsMen(!isMen);
  }

  const handleCalculateImc = async ({ height, weight }: formData) => {
    const weightNumber: number = parseFloat(weight.replace(',', '.'));
    const heightNumber: number = parseFloat(height.replace(',', '.'));

    const valueIMC: number = calculateIMC(weightNumber, heightNumber);
    setResultImc(valueIMC);

    const textIMC: string = verifyIMC(valueIMC);
    setResultText(textIMC);

    let valueIdealWeight: number = 0;
    const heightWithoutDot = Math.floor(heightNumber * 100);

    if (isMen) {
      valueIdealWeight = (50 + 0.9 * (heightWithoutDot - 152));
    } else {
      valueIdealWeight = (45.5 + 0.9 * (heightWithoutDot - 152));
    }

    setIdealWeight(valueIdealWeight.toString());
  }

  const calculateIMC = (weightValue: number, heightValue: number): number => {
    const imc: number = weightValue / (heightValue * heightValue);
    return imc;
  }

  const verifyIMC = (value: number): string => {
    let text: string = '';
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
          <Div>
            <DivInput>
              <Label>
                <Text text='Informe o peso' fs={18} cl={_gym.COLORS.GRAY_100} />
                <Controller
                  control={control}
                  name='weight'
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, value }}) => (
                    <Input
                      fs={18} h={36} w={150} br={4} pl={8}
                      placeholder='Quilo'
                      keyboardType='number-pad'
                      onChangeText={onChange}
                      value={value}
                      maxLength={8}
                    />
                  )}
                />
              </Label>

              <Label>
                <Text text='Informe a Altura' fs={18} cl={_gym.COLORS.GRAY_100} />
                <Controller
                  control={control}
                  name='height'
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, value }}) => (
                    <Input
                      fs={18} h={36} w={150} br={4} pl={8}
                      placeholder='1.85cm'
                      keyboardType='number-pad'
                      onChangeText={onChange}
                      value={value}
                      maxLength={8}
                    />
                  )}
                />
              </Label>
            </DivInput>
            <DivSwitch>
              <Text text='Mulher' fs={18} cl={_gym.COLORS.GRAY_100} />
              <Switch
                trackColor={{ false: '#fecaca', true: '#60a5fa' }}
                thumbColor={isMen ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor='#f9f5f5'
                onValueChange={toggleSwitch}
                value={isMen}
              />
              <Text text='Homen' fs={18} cl={_gym.COLORS.GRAY_100} />
            </DivSwitch>
            {resultImc &&
              <>
                <Text text={`Seu IMC = ${resultImc.toFixed(2)}`} fs={24} cl={_gym.COLORS.GRAY_100} />
                <Text text={resultText != null ? resultText : ''} fs={24} cl={_gym.COLORS.GRAY_100} />
              </>
            }
            {rightWeight &&
              <Text text={`Peso ideal para você: ${idealWeight} KG`} fs={24} cl={_gym.COLORS.GRAY_100} />
            }
          </Div>

          <ButtonCreate
            bg={_gym.COLORS.GREEN_700}
            text='Calcular'
            onPress={handleSubmit(handleCalculateImc)}
          />
        </Form>
      </Main>
    </Container>
  );
}