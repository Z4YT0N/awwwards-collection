import { Box } from '@chakra-ui/react';
import Navbar from '../landingnew/Navbar/Navbar';
import Sidebar from '../../components/navs/Sidebar';
import ProCard from '../common/ProCard';
import ProCardMobile from '../common/ProCardMobile';
import SponsorsCard from '../common/SponsorsCard';

export default function SidebarLayout({ children }) {
  return (
    <main className="app-container">
      <Navbar showDocs />
      <section className="category-wrapper">
        <Sidebar />

        {children}

        <aside className="right-panel">
          <Box className="right-panel-inner">
            <ProCard />
            <SponsorsCard />
          </Box>
        </aside>
      </section>
      <ProCardMobile />
    </main>
  );
}
