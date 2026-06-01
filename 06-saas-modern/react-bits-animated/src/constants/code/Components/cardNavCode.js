import code from '@content/Components/CardNav/CardNav.jsx?raw';
import css from '@content/Components/CardNav/CardNav.css?raw';
import tailwind from '@tailwind/Components/CardNav/CardNav.jsx?raw';
import tsCode from '@ts-default/Components/CardNav/CardNav.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/CardNav/CardNav.tsx?raw';

export const cardNav = {
  dependencies: `gsap`,
  usage: `import CardNav from './CardNav'
import logo from './logo.svg';

const App = () => {
  const items = [
    {
      label: "About",
      bgColor: "#1B1722",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#2F293A",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#2F293A", 
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
  ];

  return (
    <CardNav
      logo={logo}
      logoAlt="Company Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
};`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
