export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined,
      exercise: undefined,
      createTraining: undefined,
      createDivision: undefined,
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