export type LinkProps = {
  text: string;
  url: string;
};

export const MENU_ITEMS: Array<LinkProps> = [
  { text: 'our ranges', url: '/range' },
  { text: 'shipyard', url: '/shipyard' },
  { text: 'miti navi', url: '/miti' },
  { text: 'charter', url: '/charter' },
  { text: 'refit services', url: '/refit' },
  { text: 'news', url: '/news' },
  { text: 'photo gallery', url: '/gallery' },
  { text: 'contact us', url: '/contact' },
];

export const SOCIAL_MEDIA_ITEMS: Array<LinkProps> = [
  { text: 'Instagram', url: 'https://www.instagram.com/miti_navi/' },
  { text: 'Facebook', url: 'https://www.facebook.com/MitiNavi' },
  { text: 'Twitter', url: 'https://twitter.com/miti_navi' },
  {
    text: 'Youtube',
    url: 'https://www.youtube.com/channel/UCKa5WJ7sl8Kfw4VHB01XTVw',
  },
];

export const FOOTER_ITEMS: Array<LinkProps> = [
  { text: 'Legals', url: '/legals' },
  { text: 'Branding V&J', url: 'https://violaineetjeremy.fr/' },
  { text: 'Web Troa', url: 'https://www.troa.fr/' },
];
