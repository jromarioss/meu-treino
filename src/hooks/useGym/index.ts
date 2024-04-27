import { useContext } from 'react';
import { GymContext } from '../../context/gymContext';

export const useGym = () => {
  const gymContext = useContext(GymContext);
  return gymContext;
}