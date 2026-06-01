import { SearchProvider } from '../../components/context/SearchContext/SearchContext';
import { OptionsProvider } from '../../components/context/OptionsContext/OptionsContext';
import { TransitionProvider } from '../../components/context/TransitionContext/TransitionContext';
import { InstallationProvider } from '../../components/context/InstallationContext/InstallationContext';
import { Toaster } from 'sonner';
import { toastStyles } from '../../utils/customTheme';

export default function Providers({ children }) {
  return (
    <SearchProvider>
      <OptionsProvider>
        <TransitionProvider>
          <InstallationProvider>
            {children}
            <Toaster toastOptions={toastStyles} position="bottom-right" visibleToasts={2} />
          </InstallationProvider>
        </TransitionProvider>
      </OptionsProvider>
    </SearchProvider>
  );
}
