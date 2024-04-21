export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined,
      exercise: undefined,
      createTraining: undefined,
      createExercise: {
        trainingName: string,
      },
      myExercise: undefined,
      calculation: undefined,
      exerciseDetail: {
        type: string,
        exercise: string,
      },
    }
  }
}