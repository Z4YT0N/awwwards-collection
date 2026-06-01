import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';
import Providers from './components/layout/Providers';
import { useEffect } from 'react';
import { ActiveRouteProvider } from './components/context/ActiveRouteContext/ActiveRouteContext';
import { forceChakraDarkTheme } from './utils/utils';

import AnnouncementModal from './components/common/AnnouncementModal/AnnouncementModal';
import SidebarLayout from './components/layout/SidebarLayout';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';
import ShowcasePage from './pages/ShowcasePage';
import FavoritesPage from './pages/FavoritesPage';
import SponsorsPage from './pages/SponsorsPage';
import ToolsPage from './pages/ToolsPage';

function AppContent() {
  return (
    <>
      <Providers>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/showcase" element={<ShowcasePage />} />
          <Route exact path="/sponsors" element={<SponsorsPage />} />
          <Route path="/tools/:toolId?" element={<ToolsPage />} />
          <Route
            path="/:category/:subcategory"
            element={
              <SidebarLayout>
                <CategoryPage />
              </SidebarLayout>
            }
          />

          <Route
            path="/favorites"
            element={
              <SidebarLayout>
                <FavoritesPage />
              </SidebarLayout>
            }
          />
        </Routes>
      </Providers>
    </>
  );
}

export default function App() {
  useEffect(() => {
    forceChakraDarkTheme();
  }, []);

  return (
    <Router>
      <NuqsAdapter>
        <ActiveRouteProvider>
          <AppContent />
          <AnnouncementModal />
        </ActiveRouteProvider>
      </NuqsAdapter>
    </Router>
  );
}
