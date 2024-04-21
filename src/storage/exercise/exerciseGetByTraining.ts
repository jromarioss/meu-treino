import AsyncStorae from '@react-native-async-storage/async-storage';
import { EXERCISE_COLLECTION } from '../storageConfig';
import { exerciseStorageDTO } from './exerciseStorageDTO';

export const exerciseGetByTraining = async (training: string) => {
  try {
    const storage = await AsyncStorae.getItem(`${EXERCISE_COLLECTION}-${training}`);
    const exercises: exerciseStorageDTO[] = storage ? JSON.parse(storage) : [];
    return exercises;
  } catch (error) {
    throw error;
  }
}