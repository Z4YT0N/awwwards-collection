import styled, { css } from 'styled-components';
import tw from 'twin.macro';

const rowStyle = css`
  ${tw`flex flex-row flex-wrap flex-auto text-center -mx-4`}
`;

const columnStyle = css`
  ${tw`flex-0-auto px-4 w-full max-w-full text-center my-6`}

  /* responsive styles */
  ${tw`xl:my-0 xxl:max-w-1/3`}
`;

export const FooterContainer = styled.footer`
  ${tw`relative z-10 bg-black-500 text-cream-50 mt-12`}

  /* responsive styles */
  ${tw`xl:mt-0`}
`;

export const FooterDivider = styled.div`
  ${tw`relative text-center -z-1 -top-px text-cream-100`}

  & svg {
    ${tw`w-full m-auto max-w-7.5xl fill-current`}
  }
`;

export const BackToTop = styled.a`
  ${tw`absolute -top-4 left-1/2 -translate-x-8 w-16 cursor-pointer opacity-0 no-underline uppercase text-center text-black-500 xl:top-7.5 transition-opacity duration-600 ease-miti`}

  &.is-inview {
    ${tw`opacity-100`}
  }
`;

export const Content = styled.div`
  ${tw`px-8 mx-auto max-w-8xl`}

  /* responsive styles */
  ${tw`md:w-184 lg:w-244 xxl:w-full`}

  & hr {
    ${tw`my-15 opacity-30 border border-solid border-cream-50`}
  }
`;

export const RowResponsive = styled.div`
  ${rowStyle}
  ${tw`justify-center`}

  /* responsive styles */
  ${tw`xl:pt-0 xxl:items-end`}
`;

export const ColumnStart = styled.div`
  ${columnStyle}

  /* responsive styles */
  ${tw`xl:text-left`}
`;

export const ColumnMiddle = styled.div`
  ${columnStyle}

  /* responsive styles */
  ${tw`xl:order-none`}
`;

export const ColumnEnd = styled.div`
  ${columnStyle}

  /* responsive styles */
  ${tw`xl:text-right`}
`;

export const SocialMediaContainer = styled.div`
  ${rowStyle}
  ${tw`justify-between px-6`}
`;
