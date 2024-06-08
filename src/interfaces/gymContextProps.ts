import { ReactNode } from 'react';
import { divisionProps, exercisesProps } from './divisionProps';
import { exerciseStorageDTO } from '../storage';

export interface GymContextDataProps {
  COLORS: any;
  trainingName: string;
  trainingSelected: string;
  divisionSelected: string;
  doubtType: string;
  showMenu: boolean;
  pix: boolean;
  myExerciseShow: exercisesProps | null;
  showDoubt: boolean;
  divisionDatas: divisionProps[];
  myDivisionsShow: exerciseStorageDTO[];
  trainingToCreate: exerciseStorageDTO | null;
  onShowMenu: (value: boolean) => void;
  onSetShowDoubt: (value: boolean) => void;
  onSetPix: (value: boolean) => void;
  onSetDivisionDatas: (data: divisionProps) => void;
  onCleanDivisionDatas: () => void;
  onSetTrainingToCreate: (value: exerciseStorageDTO) => void;
  onCleanTrainingToCreate: () => void;
  onSetTrainingName: (value: string) => void;
  onCleanTrainingName: () => void;
  onSetDoubtType: (value: string) => void;
  onCleanDoubtType: () => void;
  onSetTrainingSelected: (value: string) => void;
  onCleanTrainingSelected: () => void;
  onSetDivisionSelected: (value: string) => void;
  onRemoveDivisionDatas: (name: string) => void;
  onSetMyExerciseShow: (value: exercisesProps) => void;
  onSetMyDivisionsShow: (value: exerciseStorageDTO[]) => void;
  onCleanMyExerciseShow: () => void;
  onCleanDivisionSelected: () => void;
  onCleanMyDivisionsShow: () => void;
  onRemoveExercisesFromDivisionData: (name: string, title: string) => void;
}

export interface GymContextProviderProps {
  children: ReactNode;
}