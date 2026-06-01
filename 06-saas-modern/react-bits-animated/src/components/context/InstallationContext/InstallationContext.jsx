import { createContext, useEffect, useState, useCallback } from 'react';

const InstallationContext = createContext();

export const InstallationProvider = ({ children }) => {
  const [installMode, setInstallMode] = useState(() => localStorage.getItem('rb_install_mode') || 'manual');
  const [cliTool, setCliTool] = useState(() => localStorage.getItem('rb_cli_tool') || 'shadcn');
  const [packageManager, setPackageManager] = useState(() => localStorage.getItem('rb_pkg_manager') || 'npm');

  useEffect(() => {
    localStorage.setItem('rb_install_mode', installMode);
  }, [installMode]);
  useEffect(() => {
    localStorage.setItem('rb_cli_tool', cliTool);
  }, [cliTool]);
  useEffect(() => {
    localStorage.setItem('rb_pkg_manager', packageManager);
  }, [packageManager]);

  const value = {
    installMode,
    setInstallMode: useCallback(m => setInstallMode(m), []),
    cliTool,
    setCliTool: useCallback(t => setCliTool(t), []),
    packageManager,
    setPackageManager: useCallback(p => setPackageManager(p), [])
  };

  return <InstallationContext.Provider value={value}>{children}</InstallationContext.Provider>;
};

export { InstallationContext };
