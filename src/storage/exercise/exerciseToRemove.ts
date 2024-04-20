import AsyncStorae from '@react-native-async-storage/async-storage';
import { exerciseGetAll } from './exerciseGetAll';
import { EXERCISE_COLLECTION, TRAINING_COLLECTION } from '../storageConfig';

export const exerciseToRemove = async (trainingToRemove: string) => {
  try {
    const storageTraining = await exerciseGetAll();
    const filterTraining = storageTraining.filter(training => training.name !== trainingToRemove);

    await AsyncStorae.setItem(TRAINING_COLLECTION, JSON.stringify(filterTraining));
    await AsyncStorae.removeItem(`${EXERCISE_COLLECTION}-${trainingToRemove}`)
  } catch (error) {
    throw error;
  }
}