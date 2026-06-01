import styled from 'styled-components';
import tw from 'twin.macro';
import { textTranslateHoverStyles } from '../TextTranslateEffect';
import { HeaderProps, MenuMobileProps } from './types';

export const HeaderContainer = styled.header<HeaderProps>`
  ${tw`relative z-10 py-5 -top-20 transition-top duration-600 ease-miti`}

  /* responsive styles */
  ${tw`xl:py-7.5`}

  ${({ isLoaded }) => isLoaded && tw`top-0 duration-1600 delay-1200`}
`;

export const MenuContainer = styled.div`
  ${tw`flex items-center justify-between m-auto w-full max-w-8xl`}

  /* responsive styles */
  ${tw`md:w-184 lg:w-244 xxl:w-full`}
`;

export const Link = styled.a`
  ${tw`relative cursor-pointer hidden py-4 mx-3 text-base leading-normal text-black-500 no-underline uppercase`}

  /* responsive styles */
  ${tw`xl:inline`}

  /* after styles */
  ${tw`after:(absolute h-px w-0 bottom-0 left-1/2 -translate-x-1/2 bg-black-500 opacity-30 transition-width duration-600 ease-miti)`}

  /* hover styles */
  ${tw`hover:after:w-8`}

  /* translate effect */
  ${textTranslateHoverStyles}
`;

export const MobileLink = styled(Link)`
  ${tw`block text-lg m-0 px-0 py-2`}

  /* responsive styles */
  ${tw`xl:hidden`}
`;

export const MenuTrigger = styled(Link)`
  ${tw`block p-0 mx-4`}

  /* responsive styles */
  ${tw`xl:hidden`}
`;

export const MenuMobile = styled.nav<MenuMobileProps>`
  ${tw`block relative top-15 w-full text-center pt-0 overflow-hidden h-0 border-t border-solid border-transparent transition-all duration-1000 ease-normal`}

  /* responsive styles */
  ${tw`xl:hidden`}

  ${({ isOpen }) => isOpen && tw`pt-4 h-100 border-gray-300`}
`;

export const LogoContainer = styled.div`
  ${tw`w-logo h-auto absolute top-4 left-1/2 -translate-x-15 z-10`}

  /* responsive styles */
  ${tw`xl:top-25`}
`;

export const LanguagesContainer = styled.div`
  ${tw`absolute left-auto right-6 w-auto flex items-center justify-between`}

  /* responsive styles */
  ${tw`xl:w-20 xl:left-1/2 xl:-translate-x-10`}

  & button {
    ${tw`uppercase text-base leading-normal pl-4`}

    /* responsive styles */
    ${tw`xl:text-sm xl:leading-normal xl:p-0`}
  }
`;
