import type { NextPage } from 'next';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const Home: NextPage = () => {
  return (
    <>
      <Header isLoaded />
      <div
        id="main"
        data-scroll-section
        style={{ margin: '50px 0', height: '100vh' }}
      >
        Awwwards rebuilt
      </div>
      <Footer />
    </>
  );
};

export default Home;
