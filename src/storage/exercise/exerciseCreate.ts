import AsyncStorae from '@react-native-async-storage/async-storage';
import { exerciseGetAll } from './exerciseGetAll';
import { exerciseStorageDTO } from './exerciseStorageDTO';
import { AppError } from '../../utils/appError';
import { TRAINING_COLLECTION } from '../storageConfig';

export const exerciseCreate = async (newTraining: exerciseStorageDTO) => {
  try {
    const storageTraining = await exerciseGetAll();
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