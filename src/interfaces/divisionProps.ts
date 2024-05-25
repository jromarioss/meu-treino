export interface divisionProps {
  division: string;
  exercises: exercisesProps[];
}

export interface divisionWithTrueProps {
  division: string;
  exercises: exercisesProps[];
  showExercise: boolean;
}

export interface exercisesProps {
  type: string;
  title: string;
  series: number;
  repetition: number;
  done: boolean;
}