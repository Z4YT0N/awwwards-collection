import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import ModalList from '../SiteHeaderModals';
import siteHeaderList from '../../constants/siteHeaderList';
import rectangle from '../../public/rectangle.svg';

const SiteHeaders: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>('');
  return (
    <>
      <AnimateSharedLayout>
        {siteHeaderList.map((header) => {
          const title = header.title;
          return (
            <div key={title} className='relative'>
              <button
                className='px-5 py-4 cursor-pointer text-white font-medium'
                onMouseEnter={() => setActiveMenu(title)}
                onMouseLeave={() => setActiveMenu('')}
              >
                {title}
              </button>
              {title === activeMenu && (
                <motion.div
                  layoutId='hover'
                  className='absolute inset-x-2/4 w-full top-11'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Image
                    src={rectangle}
                    height={16}
                    width={16}
                    alt='rectangle'
                  />
                </motion.div>
              )}
            </div>
          );
        })}
      </AnimateSharedLayout>
      <button className='px-5 py-3 cursor-pointer text-white font-medium'>
        <a href=''>Pricing</a>
      </button>
      <AnimatePresence>
        {activeMenu && (
          <ModalList
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            siteHeaderList={siteHeaderList}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeaders;
