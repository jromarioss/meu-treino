export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      exercise: undefined;
      createTraining: undefined;
      createDivision: undefined;
      createExercise: { divisionName: string; };
      myExercise: undefined;
      myExerciseOpen: { trainingName: string; };
      myExerciseShow: { divisionName?: string; trainingName?: string; exerciseName?: string; };
      myExerciseEdit: undefined;
      calculation: undefined;
      exerciseDetail: { type: string; exercise: string; };
    }
  }
}