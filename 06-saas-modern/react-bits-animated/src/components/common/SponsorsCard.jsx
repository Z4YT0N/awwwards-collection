import { FiExternalLink } from 'react-icons/fi';
import {
  diamondSponsors,
  platinumSponsors,
  silverSponsors,
  hasDiamondSponsors,
  hasPlatinumSponsors,
  hasSilverSponsors
} from '../../constants/Sponsors';

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

const SponsorLogo = ({ sponsor, tier, className }) => {
  const content = (
    <div className={`sc-sponsor ${className || ''}`}>
      <img src={sponsor.imageUrl} alt={sponsor.name} loading="eager" />
    </div>
  );

  if (!sponsor.url) return content;

  return (
    <a href={buildSponsorUrl(sponsor.url, tier)} target="_blank" rel="noopener noreferrer" className="sc-sponsor-link">
      {content}
    </a>
  );
};

const SponsorsCard = () => {
  return (
    <div className="right-card sc-card">
      <div className="sc-header">
        <span className="sc-title">Sponsors</span>
        <a href="mailto:contact@davidhaz.com?subject=React%20Bits%20Sponsorship%20Inquiry" className="sc-become-link">
          Become a sponsor <FiExternalLink size={10} />
        </a>
      </div>

      {hasDiamondSponsors && (
        <div className="sc-tier">
          <span className="sc-tier-label">Diamond</span>
          <div className="sc-tier-grid sc-tier-diamond">
            {diamondSponsors.map(s => (
              <SponsorLogo key={s.id} sponsor={s} tier="diamond" className="sc-sponsor-diamond" />
            ))}
          </div>
        </div>
      )}

      {hasPlatinumSponsors && (
        <div className="sc-tier">
          <span className="sc-tier-label">Platinum</span>
          <div className="sc-tier-grid sc-tier-platinum">
            {platinumSponsors.map(s => (
              <SponsorLogo key={s.id} sponsor={s} tier="platinum" className="sc-sponsor-platinum" />
            ))}
          </div>
        </div>
      )}

      {hasSilverSponsors && (
        <div className="sc-tier">
          <span className="sc-tier-label">Silver</span>
          <div className="sc-tier-grid sc-tier-silver">
            {silverSponsors.map(s => (
              <SponsorLogo key={s.id} sponsor={s} tier="silver" className="sc-sponsor-silver" />
            ))}
          </div>
        </div>
      )}

      <p className="sc-reach">500k+ devs monthly &middot; Limited spots</p>
    </div>
  );
};

export default SponsorsCard;
