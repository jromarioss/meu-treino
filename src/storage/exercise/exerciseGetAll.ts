import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXERCISE_COLLECTION } from '../storageConfig';
import { trainingGetAll, trainingStorageDTO } from '../training';

export const exerciseGetAll = async () => {
  try {
    const storageTraining = await trainingGetAll();
    console.log(storageTraining);
    const trainingFilter: trainingStorageDTO[] = storageTraining.filter((item) => item.name);

    const storagePromises = trainingFilter.map(async (item) => {
      const exerciseData = await AsyncStorage.getItem(`${EXERCISE_COLLECTION}-${item.name}`);
      return exerciseData ? JSON.parse(exerciseData) : null;
    });

    const storageResults = await Promise.all(storagePromises);

    return storageResults;
  } catch (error) {
    throw error;
  }
};
