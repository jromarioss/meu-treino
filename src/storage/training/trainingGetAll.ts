import AsyncStorae from '@react-native-async-storage/async-storage';
import { TRAINING_COLLECTION } from '../storageConfig';
import { trainingStorageDTO } from './trainingStorageDTO';

export const trainingGetAll = async () => {
  try {
    const storage = await AsyncStorae.getItem(TRAINING_COLLECTION);
    const training: trainingStorageDTO[] = storage ? JSON.parse(storage) : [];
    return training;
  } catch (error) {
    throw error;
  }
}