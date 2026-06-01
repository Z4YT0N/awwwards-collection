import { useContext } from 'react';
import { OptionsContext } from './OptionsContext';

export function useOptions() {
  return useContext(OptionsContext);
}
