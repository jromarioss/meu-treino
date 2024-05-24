import AsyncStorae from '@react-native-async-storage/async-storage';
import { trainingGetAll } from './trainingGetAll';
import { EXERCISE_COLLECTION, TRAINING_COLLECTION } from '../storageConfig';

export const trainingToRemove = async (trainingToRemove: string) => {
  try {
    const storageTraining = await trainingGetAll();
  
    const filterTraining = storageTraining.filter(training => training.name !== trainingToRemove);

    await AsyncStorae.setItem(TRAINING_COLLECTION, JSON.stringify(filterTraining));
    await AsyncStorae.removeItem(`${EXERCISE_COLLECTION}-${trainingToRemove}`)
  } catch (error) {
    throw error;
  }
}