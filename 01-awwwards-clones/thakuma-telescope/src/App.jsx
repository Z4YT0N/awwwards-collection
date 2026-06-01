import SmoothScroll from './components/Layout/SmoothScroll';
import BannerScroll from './components/Sections/BannerScroll';
import TextReveal from './components/Sections/TextReveal';
import SpotlightGallery from './components/Sections/SpotlightGallery';

function App() {
  return (
    <SmoothScroll>
      <main>
        <BannerScroll />
        <TextReveal />
        <SpotlightGallery />
      </main>
    </SmoothScroll>
  );
}

export default App;
