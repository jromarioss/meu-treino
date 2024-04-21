import { Text } from 'react-native';
import { Container } from './styled';

interface ModalExerciseProps {
  exercise: string
}
/* parei na parte do modal de criar o exercisio e salva */
export const ModalExercise = ({ exercise }: ModalExerciseProps) => {
  return (
    <Container>
      <Text>
        {exercise}
      </Text>
    </Container>
  )
}