import AsyncStorae from '@react-native-async-storage/async-storage';
import { TRAINING_COLLECTION } from '../storageConfig';
import { trainingStorageDTO } from './trainingStorageDTO';

export const trainingGeByName = async (nameTraining: string) => {
  try {
    const storage = await AsyncStorae.getItem(TRAINING_COLLECTION);
    const trainings: trainingStorageDTO[] = storage ? JSON.parse(storage) : [];

    const findTrainingByName = trainings.find(training => training.name === nameTraining);
    return findTrainingByName || null;
  } catch (error) {
    throw error;
  }
}