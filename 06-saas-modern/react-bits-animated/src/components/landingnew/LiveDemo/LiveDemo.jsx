import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { FiHome, FiSearch, FiStar, FiHeart, FiSettings } from 'react-icons/fi';
import './LiveDemo.css';

const ShapeGrid = lazy(() => import('../../../content/Backgrounds/ShapeGrid/ShapeGrid'));
const ShinyText = lazy(() => import('../../../content/TextAnimations/ShinyText/ShinyText'));
const MagicRings = lazy(() => import('../../../content/Animations/MagicRings/MagicRings'));
const Dock = lazy(() => import('../../../content/Components/Dock/Dock'));

const CARDS = [
  {
    category: 'Backgrounds',
    component: 'ShapeGrid',
    href: '/backgrounds/shape-grid',
    span: 7,
    tall: true,
    render: () => (
      <Suspense fallback={null}>
        <ShapeGrid
          shape="hexagon"
          squareSize={48}
          borderColor="rgba(255,255,255,0.08)"
          hoverFillColor="rgba(255,255,255,0.06)"
          direction="right"
          speed={0.3}
        />
      </Suspense>
    ),
  },
  {
    category: 'Animations',
    component: 'MagicRings',
    href: '/animations/magic-rings',
    span: 5,
    tall: true,
    render: () => (
      <Suspense fallback={null}>
        <div className="ln-demo-rings-wrap">
          <MagicRings
            color="#ffffff"
            colorTwo="#4d4d4d"
            ringCount={5}
            speed={0.6}
            lineThickness={1}
            opacity={0.6}
          />
        </div>
      </Suspense>
    ),
  },
  {
    category: 'Text Animations',
    component: 'ShinyText',
    href: '/text-animations/shiny-text',
    span: 4,
    render: () => (
      <Suspense fallback={null}>
        <div className="ln-demo-center">
          <ShinyText
            text="Shiny Text"
            speed={2.5}
            className="ln-demo-shiny"
          />
        </div>
      </Suspense>
    ),
  },
  {
    category: 'Components',
    component: 'Dock',
    href: '/components/dock',
    span: 8,
    render: () => (
      <Suspense fallback={null}>
        <div className="ln-demo-dock-wrap">
          <Dock
            items={[
              { icon: <FiHome size={20} />, label: 'Home' },
              { icon: <FiSearch size={20} />, label: 'Search' },
              { icon: <FiStar size={20} />, label: 'Favorites' },
              { icon: <FiHeart size={20} />, label: 'Likes' },
              { icon: <FiSettings size={20} />, label: 'Settings' },
            ]}
            magnification={56}
            distance={150}
            panelHeight={52}
            baseItemSize={36}
          />
        </div>
      </Suspense>
    ),
  },
];

const LiveDemo = () => (
  <section className="ln-demo-section">
    <div className="ln-demo-inner">
      <h2 className="ln-demo-title">See them in action</h2>

      <div className="ln-demo-grid">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.component}
            className={`ln-demo-card ln-demo-card--span-${card.span}${card.tall ? ' ln-demo-card--tall' : ''}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Link to={card.href} className="ln-demo-card-link">
              <div className="ln-demo-card-visual">
                {card.render()}
              </div>
              <div className="ln-demo-card-overlay">
                <span className="ln-demo-card-category">{card.category}</span>
                <span className="ln-demo-card-name">{card.component}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LiveDemo;
