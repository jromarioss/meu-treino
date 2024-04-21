import { ReactNode, createContext, useState } from 'react';
import { exercisesProps } from '../interfaces/divisionProps';
import { Alert } from 'react-native';

export type GymContextDataProps = {
  showMenu: boolean,
  onShowMenu: (value: boolean) => void,
}

type GymContextProviderProps = {
  children: ReactNode
}

export const GymContext = createContext<GymContextDataProps>({} as GymContextDataProps);

export const GymContextProvider = ({ children }: GymContextProviderProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const onShowMenu = (value: boolean) => {
    setShowMenu(value);
  }

  return (
    <GymContext.Provider value={{
      showMenu,
      onShowMenu,
    }}>
      {children}
    </GymContext.Provider>
  )
}