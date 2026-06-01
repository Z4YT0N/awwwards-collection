// Only include real sponsors with imageUrl - placeholders are handled in display components
export const diamondSponsors = [
  {
    id: 1,
    name: 'shadcnblocks.com',
    imageUrl: '/assets/sponsors/shadcnblocks.svg',
    url: 'https://www.shadcnblocks.com/'
  },
  {
    id: 2,
    name: 'shadcn studio',
    imageUrl: '/assets/sponsors/shadcnstudio.svg',
    url: 'https://shadcnstudio.com/'
  }
];

export const platinumSponsors = [
  {
    id: 1,
    name: 'Tailark',
    imageUrl: '/assets/sponsors/tailark.svg',
    url: 'https://pro.tailark.com'
  },
];

export const silverSponsors = [
  {
    id: 1,
    name: 'Next.js Weekly',
    imageUrl: '/assets/sponsors/nextjsweekly.svg',
    url: 'https://nextjsweekly.com/'
  },
  {
    id: 2,
    name: 'Shadcncraft',
    imageUrl: '/assets/sponsors/shadcncraft.svg',
    url: 'https://shadcncraft.com/'
  }
];

export const hasSponsors = diamondSponsors.length > 0 || platinumSponsors.length > 0 || silverSponsors.length > 0;
export const hasDiamondSponsors = diamondSponsors.length > 0;
export const hasPlatinumSponsors = platinumSponsors.length > 0;
export const hasSilverSponsors = silverSponsors.length > 0;
