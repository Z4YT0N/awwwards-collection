import useScrollToTop from '../hooks/useScrollToTop';
import Navbar from '../components/landingnew/Navbar/Navbar';
import Footer from '../components/landingnew/Footer/Footer';
import DotField from '../components/landingnew/Hero/DotField';
import { SHOWCASE_ITEMS } from '../constants/Showcase';
import { FaArrowRight } from 'react-icons/fa6';

import '../css/showcase.css';

const ShowcasePage = () => {
  useScrollToTop();

  return (
    <>
      <Navbar showDocs />
      <div className="showcase-dotfield">
        <DotField sparkle waveAmplitude={5} dotRadius={2} />
      </div>
      <section className="showcase-page">
        <title>React Bits - Showcase</title>

        <div className="showcase-header">
          <div className="showcase-header-left">
            <h1 className="showcase-title">Showcase</h1>
            <p className="showcase-subtitle">
              See how developers around the world are using React Bits in their projects.
            </p>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdlzugJovfr5HPon3YAi8YYSSRuackqX8XIXSeeQmSQypNc7w/viewform?usp=dialog"
            target="_blank"
            rel="noreferrer"
            className="showcase-submit-btn"
          >
            Submit Your Project <FaArrowRight size={12} />
          </a>
        </div>

        <div className="showcase-grid">
          {SHOWCASE_ITEMS.map(item => (
            <a
              href={item.url}
              rel="noreferrer"
              target="_blank"
              className="showcase-card"
              key={item.url}
            >
              <div className="showcase-card-media">
                <img
                  className="showcase-card-img"
                  src={item.image}
                  alt={`Showcase website by ${item.name || 'Anonymous'}`}
                  loading="lazy"
                />
              </div>
              <div className="showcase-card-info">
                <span className="showcase-card-name">{item.name || 'Anonymous'}</span>
                <span className="showcase-card-using">{item.using}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ShowcasePage;
