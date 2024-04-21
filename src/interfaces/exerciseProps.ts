export interface exerciseTypesProps {
  id: number,
  type: string,
  exercise: string,
}

export interface ExerciseProps {
  id: number,
  title: string,
  types: exerciseTypesProps[],
}