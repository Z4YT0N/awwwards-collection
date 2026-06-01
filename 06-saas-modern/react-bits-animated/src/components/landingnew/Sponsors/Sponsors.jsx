import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Gem, Crown, Medal } from 'lucide-react';
import {
  diamondSponsors,
  platinumSponsors,
  silverSponsors,
  hasDiamondSponsors,
  hasPlatinumSponsors,
  hasSilverSponsors,
} from '../../../constants/Sponsors';
import './Sponsors.css';

const buildSponsorUrl = (url, tier) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    u.searchParams.set('utm_source', 'reactbits');
    u.searchParams.set('utm_medium', 'sponsor');
    u.searchParams.set('utm_campaign', tier);
    u.searchParams.set('ref', 'reactbits');
    return u.toString();
  } catch {
    return `${url}${url.includes('?') ? '&' : '?'}utm_source=reactbits&utm_medium=sponsor&utm_campaign=${tier}&ref=reactbits`;
  }
};

const SponsorCard = ({ sponsor, tier }) => (
  <a
    href={buildSponsorUrl(sponsor.url, tier)}
    target="_blank"
    rel="noopener noreferrer"
    className={`ln-sp-card ln-sp-card--${tier}`}
  >
    <div className={`ln-sp-card-visual ln-sp-card-visual--${tier}`}>
      <img
        className="ln-sp-card-logo"
        src={sponsor.imageUrl}
        alt={sponsor.name}
        loading="lazy"
      />
    </div>
    <div className="ln-sp-card-info">
      <span className="ln-sp-card-name">{sponsor.name}</span>
      <ArrowRight size={13} className="ln-sp-card-arrow" />
    </div>
  </a>
);

const EmptySlot = ({ tier }) => (
  <div className={`ln-sp-card ln-sp-card--empty ln-sp-card--${tier}`}>
    <div className={`ln-sp-card-visual ln-sp-card-visual--${tier}`}>
      <span className="ln-sp-empty-label">Your logo here</span>
    </div>
    <div className="ln-sp-card-info">
      <span className="ln-sp-card-name ln-sp-empty-name">Available</span>
    </div>
  </div>
);

const PLATINUM_COLS = 3;
const SILVER_COLS = 5;

const Sponsors = () => (
  <section className="ln-sp-section">
    <div className="ln-sp-inner">
      <motion.h2
        className="ln-sp-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      >Sponsors</motion.h2>

      {hasDiamondSponsors && (
        <motion.div
          className="ln-sp-tier"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="ln-sp-tier-header">
            <span className="ln-sp-tier-badge ln-sp-tier-badge--diamond">
              <Gem size={12} /> Diamond
            </span>
          </div>
          <div className="ln-sp-grid ln-sp-grid--diamond">
            {diamondSponsors.map((s) => (
              <SponsorCard key={s.id} sponsor={s} tier="diamond" />
            ))}
          </div>
        </motion.div>
      )}

      {hasPlatinumSponsors && (
        <motion.div
          className="ln-sp-tier"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.14, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="ln-sp-tier-header">
            <span className="ln-sp-tier-badge ln-sp-tier-badge--platinum">
              <Crown size={12} /> Platinum
            </span>
          </div>
          <div className="ln-sp-grid ln-sp-grid--platinum">
            {platinumSponsors.map((s) => (
              <SponsorCard key={s.id} sponsor={s} tier="platinum" />
            ))}
            {Array.from({ length: PLATINUM_COLS - platinumSponsors.length }, (_, i) => (
              <EmptySlot key={`empty-platinum-${i}`} tier="platinum" />
            ))}
          </div>
        </motion.div>
      )}

      {hasSilverSponsors && (
        <motion.div
          className="ln-sp-tier"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.21, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="ln-sp-tier-header">
            <span className="ln-sp-tier-badge ln-sp-tier-badge--silver">
              <Medal size={12} /> Silver
            </span>
          </div>
          <div className="ln-sp-grid ln-sp-grid--silver">
            {silverSponsors.map((s) => (
              <SponsorCard key={s.id} sponsor={s} tier="silver" />
            ))}
            {Array.from({ length: SILVER_COLS - silverSponsors.length }, (_, i) => (
              <EmptySlot key={`empty-silver-${i}`} tier="silver" />
            ))}
          </div>
        </motion.div>
      )
      }

      <motion.div
        className="ln-sp-footer"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <Link to="/sponsors" className="ln-sp-footer-link">
          View all sponsors <ArrowRight size={12} />
        </Link>
        <a
          href="mailto:contact@davidhaz.com?subject=React%20Bits%20Sponsorship%20Inquiry"
          className="ln-sp-footer-link"
        >
          Become a sponsor <ArrowRight size={12} />
        </a>
      </motion.div>
    </div>
  </section>
);

export default Sponsors;
