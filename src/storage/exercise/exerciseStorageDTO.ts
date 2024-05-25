import { divisionProps } from '../../interfaces/divisionProps';

export interface exerciseStorageDTO {
  id?: string;
  training: string;
  divisions: divisionProps[];
}