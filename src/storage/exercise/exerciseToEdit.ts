import AsyncStorae from '@react-native-async-storage/async-storage';
import { exerciseStorageDTO } from './exerciseStorageDTO';
import { exerciseGetByTraining } from './exerciseGetByTraining';
import { EXERCISE_COLLECTION } from '../storageConfig';

export const exerciseToEdit = async (exerciseUpdate: exerciseStorageDTO, training: string) => {
  try {
    const storage = await exerciseGetByTraining(training);
    const filterExerciseToEdit = storage.findIndex(exercise => exercise.id === exerciseUpdate.id);

    if (filterExerciseToEdit !== -1) {
      storage[filterExerciseToEdit] = exerciseUpdate;

      const exercise = JSON.stringify(storage);
      await AsyncStorae.setItem(`${EXERCISE_COLLECTION}-${training}`, exercise);
    }
  } catch (error) {
    throw error;
  }
}