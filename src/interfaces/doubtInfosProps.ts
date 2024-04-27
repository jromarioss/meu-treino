export interface doubtInfosProps {
  id: number,
  name: string,
  infos: doubtInfosArrayProps
}

export interface doubtInfosArrayProps {
  title: string,
  texts: string[],
}