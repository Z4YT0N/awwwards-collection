import clsx from 'clsx';
import { ElementType, forwardRef, ReactNode } from 'react';

type BoundedProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export const Bounded = forwardRef<HTMLElement, BoundedProps>(
  ({ as: Comp = 'section', className, children, ...restProps }, ref) => {
    return (
      <Comp
        ref={ref}
        className={clsx('px-6 [.header+&]:pt-44 [.header+&]:md:pt-32', className)}
        {...restProps}
      >
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </Comp>
    );
  }
);

Bounded.displayName = 'Bounded';
