export interface divisionProps {
  division: string,
  exercises: exercisesProps[],
}

export interface exercisesProps {
  type: string,
  title: string,
  series: number,
  repetition: number,
}