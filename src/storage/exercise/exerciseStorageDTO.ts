export interface exerciseStorageDTO {
  id?: string,
  title: string,
  types: exerciseTypes[],
}

interface exerciseTypes {
  title: string,
  image: string,
  description: string[],
  series: number,
  repetition: number,
}