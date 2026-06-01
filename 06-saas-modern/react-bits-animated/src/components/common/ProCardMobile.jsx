import { LuArrowRight, LuSparkles } from 'react-icons/lu';
import './ProCardMobile.css';

const ProCardMobile = () => {
  return (
    <a
      href="https://pro.reactbits.dev"
      target="_blank"
      rel="noopener noreferrer"
      className="pro-mobile-bar"
      aria-label="Get React Bits Pro"
    >
      <span className="pro-mobile-bar-badge">
        <LuSparkles size={11} />
        NEW
      </span>
      <span className="pro-mobile-bar-text">
        <strong>React Bits Pro</strong>
        <span className="pro-mobile-bar-sub">Components, blocks, templates</span>
      </span>
      <span className="pro-mobile-bar-cta">
        Explore
        <LuArrowRight size={13} />
      </span>
    </a>
  );
};

export default ProCardMobile;
