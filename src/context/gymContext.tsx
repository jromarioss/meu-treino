import { ReactNode, createContext, useState } from 'react';
import { divisionProps } from '../interfaces/divisionProps';

export type GymContextDataProps = {
  showMenu: boolean,
  divisionDatas: divisionProps[],
  onShowMenu: (value: boolean) => void,
  onSetDivisionDatas: (data: divisionProps) => void,
  onCleanDivisionDatas: () => void,
}

type GymContextProviderProps = {
  children: ReactNode
}

export const GymContext = createContext<GymContextDataProps>({} as GymContextDataProps);

export const GymContextProvider = ({ children }: GymContextProviderProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [divisionDatas, setDivisionDatas] = useState<divisionProps[]>([]);

  const onShowMenu = (value: boolean) => {
    setShowMenu(value);
  }

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

  return (
    <GymContext.Provider value={{
      showMenu,
      divisionDatas,
      onShowMenu,
      onSetDivisionDatas,
      onCleanDivisionDatas,
    }}>
      {children}
    </GymContext.Provider>
  )
}