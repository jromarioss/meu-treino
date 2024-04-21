export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined,
      exercise: undefined,
      createTraining: undefined,
      createDivision: {
        trainingName: string,
      },
      createExercise: {
        divisionName: string,
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