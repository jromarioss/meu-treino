import { createContext, useState } from 'react';

import { divisionProps, exercisesProps } from '../interfaces/divisionProps';
import { exerciseStorageDTO } from '../storage/exercise/exerciseStorageDTO';

import { theme } from '../styles/theme';
import { GymContextDataProps, GymContextProviderProps } from '../interfaces/gymContextProps';

export const GymContext = createContext<GymContextDataProps>({} as GymContextDataProps);

export const GymContextProvider = ({ children }: GymContextProviderProps) => {
  const { COLORS } = theme;
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
  //My exercise
  const [myExerciseShow, setMyExerciseShow] = useState<exercisesProps | null>(null);
  const [myDivisionsShow, setMyDivisionsShow] = useState<exerciseStorageDTO[]>([]);
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
    const divisionIndex = divisionDatas.findIndex(item => item.division === data.division);

    if (divisionIndex !== -1) {
      const updatedDivision = { ...divisionDatas[divisionIndex] };
  
      data.exercises.forEach(exercise => {
        const exerciseIndex = updatedDivision.exercises.findIndex(item => item.title === exercise.title);
  
        if (exerciseIndex === -1) {
          updatedDivision.exercises.push(exercise);
        }
      });
  
      const updatedDivisionDatas = [...divisionDatas];
      updatedDivisionDatas[divisionIndex] = updatedDivision;
      setDivisionDatas(updatedDivisionDatas);
    } else {
      setDivisionDatas(state => [...state, data]);
    }
  }

  const onRemoveDivisionDatas = (name: string) => {
    const filterDivision = divisionDatas.filter(item => item.division !== name);
    setDivisionDatas(filterDivision);
  }

  const onRemoveExercisesFromDivisionData = (name: string, title: string) => {
    const updateDivisionDatas = divisionDatas.map(item => {
      if (item.division === name) {
        const updatedExercises = item.exercises.filter(exercise => exercise.title !== title);
        return { ...item, exercises: updatedExercises };
      }
      return item;
    });

    setDivisionDatas(updateDivisionDatas);
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
  //My exercise
  const onSetMyExerciseShow = (value: exercisesProps) => {
    setMyExerciseShow(value);
  }

  const onCleanMyExerciseShow = () => {
    setMyExerciseShow(null);
  }

  const onSetMyDivisionsShow = (value: exerciseStorageDTO[]) => {
    setMyDivisionsShow(value);
  }

  const onCleanMyDivisionsShow = () => {
    setMyDivisionsShow([]);
  }

  return (
    <GymContext.Provider value={{
      showMenu,
      COLORS,
      showDoubt,
      divisionDatas,
      trainingToCreate,
      trainingName,
      trainingSelected,
      myExerciseShow,
      myDivisionsShow,
      divisionSelected,
      doubtType,
      onShowMenu,
      onSetDivisionDatas,
      onCleanDivisionDatas,
      onSetTrainingToCreate,
      onCleanTrainingToCreate,
      onCleanMyDivisionsShow,
      onSetTrainingName,
      onSetMyDivisionsShow,
      onCleanTrainingName,
      onSetMyExerciseShow,
      onSetTrainingSelected,
      onCleanMyExerciseShow,
      onCleanTrainingSelected,
      onSetDivisionSelected,
      onCleanDivisionSelected,
      onSetShowDoubt,
      onSetDoubtType,
      onCleanDoubtType,
      onRemoveDivisionDatas,
      onRemoveExercisesFromDivisionData,
    }}>
      {children}
    </GymContext.Provider>
  );
}