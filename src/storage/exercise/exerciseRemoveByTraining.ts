import AsyncStorae from '@react-native-async-storage/async-storage';
import { exerciseGetByTraining } from './exerciseGetByTraining';
import { EXERCISE_COLLECTION } from '../storageConfig';

export const exerciseRemoveByTraining = async (trainingName: string) => {
  try {
    const storageExercise = await exerciseGetByTraining(trainingName);

    const filterExercise = storageExercise.filter(exercise => exercise.training !== trainingName);
    
    const exercises = JSON.stringify(filterExercise);
    await AsyncStorae.setItem(`${EXERCISE_COLLECTION}-${trainingName}`, exercises);
  } catch (error) {
    throw error;
  }
}