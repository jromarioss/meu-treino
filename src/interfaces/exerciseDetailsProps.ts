export interface exercisesInfoProps {
  title: string
  image: string
  description: string[]
}

export interface exerciseDetailsProps {
  id: number
  type: string
  exercises: exercisesInfoProps[]
}