import React from 'react';
import { SOCIAL_MEDIA_ITEMS, FOOTER_ITEMS } from '../../contants';
import { LogoLetter } from '../Logo';
import {
  BackToTop,
  FooterContainer,
  FooterDivider,
  Content,
  RowResponsive,
  SocialMediaContainer,
  ColumnStart,
  ColumnMiddle,
  ColumnEnd,
} from './styles';
import { AnimatedLink } from '../AnimateLink';

export const Footer: React.FunctionComponent = () => {
  return (
    <FooterContainer data-scroll-section>
      <BackToTop href="#header" data-scroll-to data-scroll>
        back <br />
        to the <br />
        top
      </BackToTop>
      <FooterDivider>
        <svg viewBox="0 0 837.6 195">
          <path
            className="st0"
            d="M0,0c167.5,0,315.7,75.8,418.8,195C521.9,75.8,670.1,0,837.6,0H0z"
          ></path>
        </svg>
      </FooterDivider>
      <Content>
        <RowResponsive className="pt-12">
          <ColumnStart as="address" className="not-italic">
            <p className="my-4">
              Mr Mark Seaton <br />
              MITI NAVI Limited <br />
              136, St Christopher Street <br />
              Valletta VLT 1463 <br />
              MALTA
            </p>
          </ColumnStart>
          <ColumnMiddle>
            <AnimatedLink href="/contact" className="py-4">
              contact us
            </AnimatedLink>
          </ColumnMiddle>
          <ColumnEnd as="address" className="not-italic">
            <p className="my-4">
              MITI NAVI Sales Office <br />
              Port Camille Rayon <br />
              Quai Napoléon <br />
              06220 Golfe-Juan <br />
              FRANCE
            </p>
          </ColumnEnd>
        </RowResponsive>

        <hr />

        <SocialMediaContainer>
          {SOCIAL_MEDIA_ITEMS.map((item, itemIndex) => (
            <AnimatedLink
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm leading-normal"
            >
              {item.text}
            </AnimatedLink>
          ))}
        </SocialMediaContainer>

        <hr />

        <RowResponsive className="pb-15">
          <ColumnStart>
            <p className="text-xs leading-normal">
              © 2021 Miti Navi, all right reserved.
            </p>
          </ColumnStart>

          <ColumnMiddle>
            <LogoLetter className="w-10 mx-auto" />
          </ColumnMiddle>

          <ColumnEnd>
            {FOOTER_ITEMS.map((item, itemIndex) => (
              <AnimatedLink
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xxs leading-normal mr-4"
              >
                {item.text}
              </AnimatedLink>
            ))}
          </ColumnEnd>
        </RowResponsive>
      </Content>
    </FooterContainer>
  );
};
