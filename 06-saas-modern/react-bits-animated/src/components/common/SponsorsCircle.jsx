import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import SimpleMarquee from './SimpleMarquee';
import '../../css/category.css';
import {
  diamondSponsors,
  platinumSponsors,
  silverSponsors,
  hasDiamondSponsors,
  hasPlatinumSponsors,
  hasSilverSponsors
} from '../../constants/Sponsors';
import { colors } from '../../constants/colors';

const createTierStyle = (overrides = {}) => {
  const base = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '10px',
      border: `1px solid ${colors.bgElevated}`,
      background: `${colors.bgBody}66`,
      overflow: 'hidden',
      flexShrink: 0,
      cursor: 'pointer',
      transition: 'all 0.25s ease',
      ...overrides.container
    },
    containerHover: {
      borderColor: colors.accent,
      background: `${colors.primary}1a`,
      boxShadow: `0 0 12px ${colors.primary}40`,
      ...overrides.containerHover
    },
    image: {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      padding: '8px',
      transition: 'transform 0.25s ease',
      ...overrides.image
    },
    imageHover: { transform: 'scale(1.05)' }
  };
  return base;
};

const tierStyles = {
  diamond: createTierStyle({
    container: { width: '100%', height: '60px', borderRadius: '12px', background: 'transparent' },
    containerHover: { boxShadow: `0 0 16px ${colors.primary}4d` },
    image: { padding: '10px 16px' }
  }),
  platinum: createTierStyle({
    container: { width: '120px', height: '60px', marginRight: '12px', position: 'relative' }
  }),
  silver: createTierStyle({
    container: { width: '92px', height: '52px', position: 'relative' },
    image: { padding: '6px' }
  })
};

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

const SponsorItem = ({ sponsor, tier, fullWidth = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const showTooltip = tier === 'platinum' || tier === 'silver';
  const styles = tierStyles[tier];

  let containerStyle =
    fullWidth && tier === 'diamond' ? { ...styles.container, flex: 1, width: '100%' } : { ...styles.container };

  if (isHovered) {
    containerStyle = { ...containerStyle, ...styles.containerHover };
  }

  const imageStyle = isHovered ? { ...styles.image, ...styles.imageHover } : styles.image;

  const wrapperProps = {
    className: 'sponsor-item-wrapper',
    style: {
      position: 'relative',
      display: tier === 'diamond' ? 'flex' : 'inline-block',
      height: tier === 'diamond' ? '100%' : 'auto'
    },
    ...(showTooltip && { 'data-tooltip': sponsor.name })
  };

  const content = (
    <div {...wrapperProps}>
      <div style={containerStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <img
          src={sponsor.imageUrl}
          alt={sponsor.name}
          width={tier === 'diamond' ? 220 : tier === 'platinum' ? 150 : 70}
          height={tier === 'diamond' ? 70 : tier === 'platinum' ? 70 : 32}
          style={imageStyle}
          loading="eager"
        />
      </div>
    </div>
  );

  if (sponsor.url) {
    const trackedUrl = buildSponsorUrl(sponsor.url, tier);
    let linkStyle = { textDecoration: 'none', display: 'block' };

    if (fullWidth && tier === 'diamond') {
      linkStyle = { ...linkStyle, flex: 1, width: '100%', height: '100%' };
    } else if (tier === 'diamond') {
      linkStyle = { ...linkStyle, height: '100%' };
    }

    return (
      <a href={trackedUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
        {content}
      </a>
    );
  }

  return content;
};

const TierSection = ({ label, children, hasSponsors }) => {
  if (!hasSponsors) return null;
  return (
    <div className="sponsor-tier-section">
      <div className="sponsor-tier-header">
        <Text className="sponsor-tier-label">{label}</Text>
      </div>
      {children}
    </div>
  );
};

const StaticSponsorsRow = ({ sponsors, tier }) => {
  const isDiamond = tier === 'diamond';

  const rowStyle = {
    display: 'flex',
    flexDirection: isDiamond ? 'column' : 'row',
    alignItems: isDiamond ? 'stretch' : 'center',
    gap: '10px',
    padding: '0 1.25em',
    flexWrap: isDiamond ? 'nowrap' : 'wrap'
  };

  return (
    <div style={rowStyle}>
      {sponsors.map(sponsor => (
        <SponsorItem key={sponsor.id} sponsor={sponsor} tier={tier} fullWidth={isDiamond} />
      ))}
    </div>
  );
};

const MIN_FOR_MARQUEE = 5;

const SponsorsCircle = () => {
  const useDiamondMarquee = diamondSponsors.length >= MIN_FOR_MARQUEE;
  const usePlatinumMarquee = platinumSponsors.length >= MIN_FOR_MARQUEE;
  const useSilverMarquee = silverSponsors.length >= MIN_FOR_MARQUEE;

  return (
    <div className="sponsors-marquee-container">
      {/* Diamond Sponsors */}
      <TierSection label="Diamond" hasSponsors={hasDiamondSponsors}>
        {useDiamondMarquee ? (
          <div className="sponsors-marquee-wrapper">
            <SimpleMarquee
              direction="left"
              baseVelocity={4}
              slowdownOnHover={true}
              slowDownFactor={0.15}
              repeat={4}
              className="overflow-hidden"
            >
              <Box className="flex" userSelect="none">
                {diamondSponsors.map(sponsor => (
                  <SponsorItem key={sponsor.id} sponsor={sponsor} tier="diamond" />
                ))}
              </Box>
            </SimpleMarquee>
          </div>
        ) : (
          <StaticSponsorsRow sponsors={diamondSponsors} tier="diamond" />
        )}
      </TierSection>

      {/* Platinum Sponsors */}
      <TierSection label="Platinum" hasSponsors={hasPlatinumSponsors}>
        {usePlatinumMarquee ? (
          <div className="sponsors-marquee-wrapper">
            <SimpleMarquee
              direction="right"
              baseVelocity={3}
              slowdownOnHover={true}
              slowDownFactor={0.15}
              repeat={4}
              className="overflow-hidden"
            >
              <Box className="flex" userSelect="none">
                {platinumSponsors.map(sponsor => (
                  <SponsorItem key={sponsor.id} sponsor={sponsor} tier="platinum" />
                ))}
              </Box>
            </SimpleMarquee>
          </div>
        ) : (
          <StaticSponsorsRow sponsors={platinumSponsors} tier="platinum" />
        )}
      </TierSection>

      {/* Silver Sponsors */}
      <TierSection label="Silver" hasSponsors={hasSilverSponsors}>
        {useSilverMarquee ? (
          <div className="sponsors-marquee-wrapper">
            <SimpleMarquee
              direction="left"
              baseVelocity={5}
              slowdownOnHover={true}
              slowDownFactor={0.15}
              repeat={4}
              className="overflow-hidden"
            >
              <Box className="flex" userSelect="none">
                {silverSponsors.map(sponsor => (
                  <SponsorItem key={sponsor.id} sponsor={sponsor} tier="silver" />
                ))}
              </Box>
            </SimpleMarquee>
          </div>
        ) : (
          <StaticSponsorsRow sponsors={silverSponsors} tier="silver" />
        )}
      </TierSection>
    </div>
  );
};

export default SponsorsCircle;
