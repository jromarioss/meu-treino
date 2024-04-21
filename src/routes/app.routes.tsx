import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Exercises } from '../screens/Exercises';
import { CreateTraining } from '../screens/CreateTraining';
import { MyExercise } from '../screens/MyExercise';
import { Calculation } from '../screens/Calculation';
import { ExerciseDetail } from '../screens/ExerciseDetail';
import { CreateDivision } from '../screens/CreateDivision';
import { CreateExercise } from '../screens/CreateExercise';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRouter() {
 
  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen name='home' component={Home} />
      <Screen name='exercise' component={Exercises} />
      <Screen name='createTraining' component={CreateTraining} />
      <Screen name='createDivision' component={CreateDivision} />
      <Screen name='createExercise' component={CreateExercise} />
      <Screen name='myExercise' component={MyExercise} />
      <Screen name='calculation' component={Calculation} />
      <Screen name='exerciseDetail' component={ExerciseDetail} />
    </Navigator>
  )
}