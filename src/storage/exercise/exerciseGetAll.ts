import AsyncStorae from '@react-native-async-storage/async-storage';
import { TRAINING_COLLECTION } from '../storageConfig';
import { exerciseStorageDTO } from './exerciseStorageDTO';

export const exerciseGetAll = async () => {
  try {
    const storage = await AsyncStorae.getItem(TRAINING_COLLECTION);
    const training: exerciseStorageDTO[] = storage ? JSON.parse(storage) : [];
    return training;
  } catch (error) {
    throw error;
  }
}