import { SVGProps, FC } from 'react';

export const Third: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="36" height="36" className='w-[2.4vw] h-[2.4vw] md:w-[3vw] md:h-[3vw]' viewBox="0 0 36 36" {...props}>
    <g clipPath="url(#clip0_250_11)">
      <rect x="3" y="20.6855" width="18" height="18" rx="2" transform="rotate(-25 3 20.6855)" fill="#E6E0E9" />
      <rect x="22.9592" y="-1" width="10" height="10" rx="1" fill="#E6E0E9" />
    </g>
    <defs>
      <clipPath id="clip0_250_11">
        <rect width="36" height="36" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
