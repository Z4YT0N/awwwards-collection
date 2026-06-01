import { FC, SVGProps, useState } from 'react';

import { cn } from '@/shared/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  cards: { title: string; icon: FC<SVGProps<SVGSVGElement>>; description: string }[];
  wrapperClasses?: string;
  itemClasses?: string;
}

const Index: FC<Props> = ({ cards, itemClasses, wrapperClasses }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className={cn('grid md:grid-cols-2 ', itemClasses)}>
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={cn('relative flex flex-col px-[0.4vw] md:px-[0.6vw] md:py-[0.5vw] py-[0.3vw] last:col-span-2 md:col-span-2', itemClasses)}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <AnimatePresence>
            {hoveredIdx === idx && (
              <motion.span
                className={cn(
                  'absolute inset-0 z-0 block h-full w-full rounded-[1.333vw] bg-stroke/50',
                  wrapperClasses,
                )}
                layoutId="cardHoverEffect"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.1, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div
            className={cn(
              'z-[1] h-full min-w-[18vw] space-y-[1.2vw] rounded-[1vw] border-[0.2vw] border-stroke px-[1.4vw] py-[1.6vw] md:min-w-full',
            )}
          >
            <div className="flex items-center space-x-[0.6vw]">
              {<card.icon />}
              <h6 className="text-[1.6vw] md:text-[3.5vw] md:tracking-tight">{card.title}</h6>
            </div>
            <p className="text-[1vw] md:text-[2.25vw] font-light leading-[1.5] md:leading-[1.2] md:tracking-tight">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Index;
