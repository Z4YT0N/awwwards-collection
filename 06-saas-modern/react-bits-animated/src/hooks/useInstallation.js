import { useContext } from 'react';
import { InstallationContext } from '../components/context/InstallationContext/InstallationContext';

export const useInstallation = () => {
  const ctx = useContext(InstallationContext);
  if (!ctx) throw new Error('useInstallation must be used within InstallationProvider');
  return ctx;
};
