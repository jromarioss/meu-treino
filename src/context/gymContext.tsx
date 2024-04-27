import { ReactNode, createContext, useState } from 'react';
import { divisionProps } from '../interfaces/divisionProps';
import { exerciseStorageDTO } from '../storage/exercise/exerciseStorageDTO';

export type GymContextDataProps = {
  trainingName: string,
  trainingSelected: string,
  divisionSelected: string,
  doubtType: string,
  showMenu: boolean,
  showDoubt: boolean,
  divisionDatas: divisionProps[],
  trainingToCreate: exerciseStorageDTO | null,
  onShowMenu: (value: boolean) => void,
  onSetShowDoubt: (value: boolean) => void,
  onSetDivisionDatas: (data: divisionProps) => void,
  onCleanDivisionDatas: () => void,
  onSetTrainingToCreate: (value: exerciseStorageDTO) => void,
  onCleanTrainingToCreate: () => void,
  onSetTrainingName: (value: string) => void,
  onCleanTrainingName: () => void,
  onSetDoubtType: (value: string) => void,
  onCleanDoubtType: () => void,
  onSetTrainingSelected: (value: string) => void,
  onCleanTrainingSelected: () => void,
  onSetDivisionSelected: (value: string) => void,
  onCleanDivisionSelected: () => void,
}

type GymContextProviderProps = {
  children: ReactNode
}

export const GymContext = createContext<GymContextDataProps>({} as GymContextDataProps);

export const GymContextProvider = ({ children }: GymContextProviderProps) => {
  //Header
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showDoubt, setShowDoubt] = useState<boolean>(false);
  const [doubtType, setDoubtType] = useState<string>('');
  //Create division
  const [divisionDatas, setDivisionDatas] = useState<divisionProps[]>([]);
  const [divisionSelected, setDivisionSelected] = useState<string>('');
  //Create training
  const [trainingToCreate, setTrainingToCreate] = useState<exerciseStorageDTO | null>(null);
  const [trainingName, setTainingName] = useState<string>('');
  const [trainingSelected, setTrainingSelected] = useState<string>('');
  //Header
  const onShowMenu = (value: boolean) => {
    setShowMenu(value);
  }

  const onSetShowDoubt = (value: boolean) => {
    setShowDoubt(value);
  }

  const onSetDoubtType = (value: string) => {
    setDoubtType(value);
  }

  const onCleanDoubtType = () => {
    setDoubtType('');
  }
  //Division
  const onSetDivisionDatas = (data: divisionProps) => {
    const divisionExists = divisionDatas.find(item => item.division === data.division);

    if (divisionExists) {
      return;
    }

    setDivisionDatas(state => [...state, data]);
  }

  const onCleanDivisionDatas = () => {
    setDivisionDatas([]);
  }

  const onSetDivisionSelected = (value: string) => {
    setDivisionSelected(value);
  }

  const onCleanDivisionSelected = () => {
    setDivisionSelected('');
  }
  //Training
  const onSetTrainingToCreate = (value: exerciseStorageDTO) => {
    setTrainingToCreate(value);
  }

  const onCleanTrainingToCreate = () => {
    setTrainingToCreate(null);
  }

  const onSetTrainingName = (value: string) => {
    if (trainingName === value) {
      return;
    }

    setTainingName(value);
  }

  const onCleanTrainingName = () => {
    setTainingName('');
  }
  
  const onSetTrainingSelected = (value: string) => {
    setTrainingSelected(value);
  }

  const onCleanTrainingSelected = () => {
    setTrainingSelected('');
  }

  return (
    <GymContext.Provider value={{
      showMenu,
      showDoubt,
      divisionDatas,
      trainingToCreate,
      trainingName,
      trainingSelected,
      divisionSelected,
      doubtType,
      onShowMenu,
      onSetDivisionDatas,
      onCleanDivisionDatas,
      onSetTrainingToCreate,
      onCleanTrainingToCreate,
      onSetTrainingName,
      onCleanTrainingName,
      onSetTrainingSelected,
      onCleanTrainingSelected,
      onSetDivisionSelected,
      onCleanDivisionSelected,
      onSetShowDoubt,
      onSetDoubtType,
      onCleanDoubtType,
    }}>
      {children}
    </GymContext.Provider>
  );
}