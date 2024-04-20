import AsyncStorae from '@react-native-async-storage/async-storage';
import { trainingGetAll } from './trainingGetAll';
import { trainingStorageDTO } from './trainingStorageDTO';
import { AppError } from '../../utils/appError';
import { TRAINING_COLLECTION } from '../storageConfig';

export const trainingCreate = async (newTraining: trainingStorageDTO) => {
  try {
    const storageTraining = await trainingGetAll();
    const trainingAlreadyExists = storageTraining.filter(training => training.name === newTraining.name);

    if (trainingAlreadyExists.length > 0) {
      throw new AppError('Já existe um treino criado com esse nome.');
    }

    const storage = JSON.stringify([...storageTraining, newTraining]);
    await AsyncStorae.setItem(TRAINING_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}