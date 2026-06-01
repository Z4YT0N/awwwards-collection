import { Eye, Star, Component, Gem, Crown, Medal, ArrowRight } from 'lucide-react';
import useScrollToTop from '../hooks/useScrollToTop';
import Navbar from '../components/landingnew/Navbar/Navbar';
import Footer from '../components/landingnew/Footer/Footer';
import DotField from '../components/landingnew/Hero/DotField';
import { diamondSponsors, platinumSponsors, silverSponsors } from '../constants/Sponsors';
import { FaArrowRight } from 'react-icons/fa6';

import '../css/sponsors-page.css';

const buildSponsorUrl = (url, tier) => {
  if (!url) return null;
  try {
    const sponsorUrl = new URL(url);
    sponsorUrl.searchParams.set('utm_source', 'reactbits');
    sponsorUrl.searchParams.set('utm_medium', 'sponsor');
    sponsorUrl.searchParams.set('utm_campaign', tier);
    sponsorUrl.searchParams.set('ref', 'reactbits');
    return sponsorUrl.toString();
  } catch {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}utm_source=reactbits&utm_medium=sponsor&utm_campaign=${tier}&ref=reactbits`;
  }
};

const STATS = [
  { icon: Eye, value: '500K+', label: 'Monthly Visitors' },
  { icon: Star, value: '37K+', label: 'GitHub Stars' },
  { icon: Component, value: '130+', label: 'Components' },
];

const TIERS = [
  { key: 'diamond', label: 'Diamond', icon: Gem, sponsors: diamondSponsors },
  { key: 'platinum', label: 'Platinum', icon: Crown, sponsors: platinumSponsors },
  { key: 'silver', label: 'Silver', icon: Medal, sponsors: silverSponsors },
].filter(tier => tier.sponsors.length > 0);

const SponsorsPage = () => {
  useScrollToTop();

  return (
    <>
      <Navbar showDocs />
      <div className="sponsors-dotfield">
        <DotField sparkle waveAmplitude={5} dotRadius={2} />
      </div>
      <section className="sponsors-page">
        <title>React Bits - Sponsors</title>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="sponsors-page-header">
          <div className="sponsors-page-header-left">
            <h1 className="sponsors-page-title">Sponsors</h1>
            <p className="sponsors-page-subtitle">
              Your support keeps React Bits free and open-source for developers everywhere.
            </p>
          </div>
          <a
            href="mailto:contact@davidhaz.com?subject=React%20Bits%20Sponsorship%20Inquiry"
            className="sponsors-page-cta"
          >
            Become a Sponsor <FaArrowRight size={12} />
          </a>
        </div>

        {/* ── Tiers ───────────────────────────────────────────────── */}
        {TIERS.map(tier => (
          <div className="sponsors-tier-section" key={tier.key}>
            <div className="sponsors-tier-header">
              <span className={`sponsors-tier-badge sponsors-tier-badge--${tier.key}`}>
                <tier.icon size={13} />
                {tier.label}
              </span>
            </div>

            {tier.sponsors.length > 0 ? (
              <div className={`sponsors-tier-grid sponsors-tier-grid--${tier.key}`}>
                {tier.sponsors.map(sponsor => {
                  const href = buildSponsorUrl(sponsor.url, tier.key);
                  return (
                    <a
                      key={sponsor.id}
                      href={href}
                      target="_blank"
                      rel="noopener"
                      className="sponsors-page-card"
                    >
                      <div className={`sponsors-card-banner sponsors-card-banner--${tier.key}`}>
                        <img
                          className="sponsors-card-logo"
                          src={sponsor.imageUrl}
                          alt={sponsor.name}
                        />
                      </div>
                      <div className="sponsors-card-body">
                        <span className="sponsors-card-name">{sponsor.name}</span>
                        <span className="sponsors-card-arrow">
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            ) : (
              <div className="sponsors-tier-empty">Available — reach out to claim this spot</div>
            )}
          </div>
        ))}

        {/* ── Divider ──────────────────────────────────────────── */}
        <hr className="sponsors-divider" />

        <h2 className="sponsors-section-title">Power the fastest growing creative UI library</h2>

        {/* ── Stats ───────────────────────────────────────────────── */}
        <div className="sponsors-stats">
          {STATS.map(s => (
            <div className="sponsors-stat" key={s.label}>
              <span className="sponsors-stat-icon"><s.icon size={22} /></span>
              <span className="sponsors-stat-value">{s.value}</span>
              <span className="sponsors-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ──────────────────────────────────────────── */}
        <div className="sponsors-bottom-cta">
          <p className="sponsors-bottom-cta-text">
            Get your brand in front of <strong>500K+</strong> developers monthly
          </p>
          <a
            href="mailto:contact@davidhaz.com?subject=React%20Bits%20Sponsorship%20Inquiry"
            className="sponsors-bottom-cta-btn"
          >
            Become a Sponsor <ArrowRight size={14} />
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SponsorsPage;
