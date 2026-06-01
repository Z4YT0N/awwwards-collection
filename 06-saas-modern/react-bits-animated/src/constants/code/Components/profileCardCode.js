import code from '@content/Components/ProfileCard/ProfileCard.jsx?raw';
import css from '@content/Components/ProfileCard/ProfileCard.css?raw';
import tailwind from '@tailwind/Components/ProfileCard/ProfileCard.jsx?raw';
import tsCode from '@ts-default/Components/ProfileCard/ProfileCard.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ProfileCard/ProfileCard.tsx?raw';

export const profileCard = {
  usage: `import ProfileCard from './ProfileCard'
  
<ProfileCard
  name="Javi A. Torres"
  title="Software Engineer"
  handle="javicodes"
  status="Online"
  contactText="Contact Me"
  avatarUrl="/path/to/avatar.jpg"
  showUserInfo={true}
  enableTilt={true}
  enableMobileTilt={false}
  onContactClick={() => console.log('Contact clicked')}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
