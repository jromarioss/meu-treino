import AsyncStorae from '@react-native-async-storage/async-storage';
import { exerciseGetByTraining } from './exerciseGetByTraining';
import { exerciseStorageDTO } from './exerciseStorageDTO';
import { AppError } from '../../utils/appError';
import { EXERCISE_COLLECTION } from '../storageConfig';

export const exerciseCreate = async (newExercise: exerciseStorageDTO, training: string) => {
  try {
    const storageExercise = await exerciseGetByTraining(training);
    const exerciseAlreadyExists = storageExercise.filter(exercise => exercise.title === newExercise.title);

    if (exerciseAlreadyExists.length > 0) {
      throw new AppError('Exercício já adicionado no seu traino.');
    }

    const storage = JSON.stringify([...storageExercise, newExercise]);
    await AsyncStorae.setItem(`${EXERCISE_COLLECTION}-${training}`, storage);
  } catch (error) {
    throw error;
  }
}