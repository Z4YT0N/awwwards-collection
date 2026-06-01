import styled from 'styled-components';
import tw from 'twin.macro';

export const LinkTranslateEffect = styled.a<{ isInView: boolean }>`
  ${tw`relative inline-block uppercase tracking-px transition-opacity duration-600 ease-miti`}

  /* after styles */
  ${tw`after:(absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-cream-50 transition-all duration-1000 ease-miti delay-600)`}
  ${({ isInView }) => isInView && tw`after:w-full`}

  /* hover after styles */
  ${tw`hover:after:(w-10/12 opacity-30 delay-none)`}

  & .animated-text-item {
    ${tw`top-5`}
    ${({ isInView }) => isInView && tw`top-0`}
  }

  & .animated-text-item,
  & .animated-text-item__hover {
    ${tw`transition-top duration-1000 ease-miti delay-600`}
  }

  &:hover {
    & .animated-text-item,
    & .animated-text-item__hover {
      ${tw`transition-top duration-1000 ease-miti delay-none`}
    }

    && .animated-text-item {
      ${tw`-top-5`}
    }

    && .animated-text-item__hover {
      ${tw`top-0`}
    }
  }

  /* &.animated-in-view {
    ${tw`after:w-full`}

    & .animated-text-item {
      ${tw`top-0`}
    }
  } */
`;
