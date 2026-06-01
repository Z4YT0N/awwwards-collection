import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export const Text = styled.span`
  ${tw`relative top-0 transition-top duration-1000 ease-miti`}
`;

export const TextHover = styled.span`
  ${tw`absolute top-5 text-gray-100 left-0 transition-top duration-1000 ease-miti`}
`;

export const textTranslateHoverStyles = css`
  &:hover {
    & ${Text} {
      ${tw`-top-5`}
    }

    & ${TextHover} {
      ${tw`top-0`}
    }
  }
`;

export const TextWrapper = styled.span`
  ${tw`relative overflow-hidden inline-block`}
  ${textTranslateHoverStyles}
`;
