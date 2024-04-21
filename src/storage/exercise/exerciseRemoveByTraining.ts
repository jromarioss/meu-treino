import AsyncStorae from '@react-native-async-storage/async-storage';
import { exerciseGetByTraining } from './exerciseGetByTraining';
import { EXERCISE_COLLECTION } from '../storageConfig';

export const exerciseRemoveByTraining = async (trainingName: string, training: string) => {
  try {
    const storageExercise = await exerciseGetByTraining(training);
    const filterExercise = storageExercise.filter(exercise => exercise.title !== trainingName);

    const exercises = JSON.stringify(filterExercise);
    await AsyncStorae.setItem(`${EXERCISE_COLLECTION}-${training}`, exercises);
  } catch (error) {
    throw error;
  }
}