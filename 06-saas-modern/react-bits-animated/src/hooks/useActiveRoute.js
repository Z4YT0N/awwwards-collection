import { useContext } from 'react';
import { ActiveRouteContext } from '../components/context/ActiveRouteContext/ActiveRouteContext';

export const useActiveRoute = () => {
  const ctx = useContext(ActiveRouteContext);
  if (!ctx) throw new Error('useActiveRoute must be used within an ActiveRouteProvider');
  return ctx;
};
