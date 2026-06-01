import { SVGProps, FC } from 'react';

export const First: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="32" height="33" className='w-[2vw] h-[2vw] md:w-[3vw] md:h-[3vw]' viewBox="0 0 32 33" fill="none" {...props}>
    <circle cx="8" cy="8.41406" r="8" fill="#E6E0E9" />
    <circle cx="24" cy="24.4141" r="8" fill="#E6E0E9" />
  </svg>
);

export default First;
