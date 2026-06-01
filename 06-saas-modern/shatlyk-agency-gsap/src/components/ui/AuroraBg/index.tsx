'use client';
import { HTMLProps, ReactNode } from 'react';

import { cn } from '@/shared/utils';

interface AuroraBackgroundProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

const AuroraBackground = ({ className, children, showRadialGradient = true, ...props }: AuroraBackgroundProps) => {
  return (
    <main className="z-[500]">
      <div className={cn('relative ', className)} {...props}>
        <div className="absolute inset-0 z-40 overflow-hidden">
          <div
            className={cn(
              `
            pointer-events-none
            absolute
            -inset-[10px]
            opacity-20
            blur-[10px]
            invert
            filter
            will-change-transform [--aurora:repeating-linear-gradient(-100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,#4A4458_25%,var(--blue-400)_30%)] [--dark-gradient:repeating-linear-gradient(-100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(-100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [background-image:var(--white-gradient),var(--aurora)] [background-position:50%_50%,50%_50%] [background-size:300%,_200%] after:absolute 
            after:inset-0
            after:animate-aurora 
            after:mix-blend-difference after:content-[""] after:[background-attachment:fixed]
            after:[background-image:var(--white-gradient),var(--aurora)]
            after:[background-size:200%,_100%] dark:invert-0 dark:[background-image:var(--dark-gradient),var(--aurora)] after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,

              showRadialGradient && `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_95%)]`,
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};

export default AuroraBackground;
