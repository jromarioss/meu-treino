import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Exercises } from '../screens/Exercises';
import { CreateExercise } from '../screens/CreateExercise';
import { MyExercise } from '../screens/MyExercise';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRouter() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='home' component={Home} />
      <Screen name='exercise' component={Exercises} />
      <Screen name='createExercise' component={CreateExercise} />
      <Screen name='myExercise' component={MyExercise} />
    </Navigator>
  )
}