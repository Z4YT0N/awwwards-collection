import React from 'react';
import NextLink from 'next/link';
import { MENU_ITEMS, LinkProps } from '../../contants';
import { splitArrayInHalf } from '../../utils';
import { Logo } from '../Logo';
import { TextTranslateEffect } from '../TextTranslateEffect';
import {
  HeaderContainer,
  Link,
  MenuTrigger,
  MenuMobile,
  MobileLink,
  LogoContainer,
  LanguagesContainer,
  MenuContainer,
} from './styles';
import { HeaderProps } from './types';

export const Header: React.FC<HeaderProps> = ({ isLoaded }) => {
  const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false);

  const [firstHalf, secondHalf] = splitArrayInHalf<LinkProps>(MENU_ITEMS);

  return (
    <HeaderContainer id="header" data-scroll-section isLoaded={isLoaded}>
      <MenuContainer>
        <MenuTrigger role="button" onClick={() => setMenuOpen(value => !value)}>
          <span>{isMenuOpen ? 'fermer' : 'menu'}</span>
        </MenuTrigger>
        <nav>
          {firstHalf.map(item => (
            <NextLink href={item.url} key={item.url} passHref>
              <Link>
                <TextTranslateEffect>{item.text}</TextTranslateEffect>
              </Link>
            </NextLink>
          ))}
        </nav>
        <LogoContainer>
          <NextLink href="/" passHref>
            <a>
              <Logo />
            </a>
          </NextLink>
        </LogoContainer>
        <nav>
          {secondHalf.map(item => (
            <NextLink href={item.url} key={item.url} passHref>
              <Link>
                <TextTranslateEffect>{item.text}</TextTranslateEffect>
              </Link>
            </NextLink>
          ))}
        </nav>
        <LanguagesContainer>
          <button>en</button>
          <button>fr</button>
        </LanguagesContainer>
      </MenuContainer>
      <MenuMobile isOpen={isMenuOpen}>
        {MENU_ITEMS.map(item => (
          <NextLink href={item.url} key={item.url} passHref>
            <MobileLink>{item.text}</MobileLink>
          </NextLink>
        ))}
      </MenuMobile>
    </HeaderContainer>
  );
};
