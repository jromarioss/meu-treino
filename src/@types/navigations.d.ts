export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined,
      exercise: undefined,
      createTraining: {
        name?: string,
      },
      createTrainingName: undefined,
      createDivision: {
        divisionName?: string,
      },
      createExercise: {
        divisionName: string,
      },
      myExercise: undefined,
      myExerciseOpen: {
        trainingName: string,
      },
      calculation: undefined,
      exerciseDetail: {
        type: string,
        exercise: string,
      },
    }
  }
}