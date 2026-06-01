'use client';
import { FC, useEffect, useState } from 'react';

import SidebarMenu from '@/components/SidebarMenu';
import { AnimatePresence } from 'framer-motion';
import { LogoIcon } from '@/icons/ApproachIcons/LogoIcon';

interface Props {}

const Index: FC<Props> = () => {
  const [isActive, setIsActive] = useState(false);
  const closeSidebar = () => setIsActive(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsActive(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  return (
    <div >
      <div className="fixed right-0 z-[4001] p-[2vw]">
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className="flex h-[4.5vw] w-[4.5vw] cursor-pointer items-center justify-center rounded-full bg-stone-400">
          <div className={`burger ${isActive && 'burgerActive'}`}></div>
        </button>
      </div>
      <button title="your_agency_name" className="p-[2vw] fixed z-[100] top-0 left-0 group">
        <LogoIcon className="w-[5vw] h-[5vw] group-hover:text-white/80 transition duration-300" />
      </button>
      <AnimatePresence mode="wait">{isActive && (
        <SidebarMenu close={closeSidebar} />
      )}
      </AnimatePresence>
    </div>
  );
};
export default Index;
