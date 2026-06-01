import React, { AnchorHTMLAttributes } from 'react';
import NextLink from 'next/link';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { isInView } from '../../utils';
import { TextTranslateEffect } from '../TextTranslateEffect';
import { LinkTranslateEffect } from './styles';

type FooterAnimatedLinkProps = {
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const AnimatedLink: React.FC<FooterAnimatedLinkProps> = ({
  children,
  href,
  ...otherProps
}) => {
  const [inView, setInView] = React.useState(false);
  const linkRef = React.useRef<HTMLAnchorElement | null>(null);
  const { scroll, isReady } = useLocomotiveScroll();

  React.useEffect(() => {
    if (isReady && !inView) {
      const handleScroll = () => {
        if (isInView(linkRef.current, false)) {
          setInView(true);
          scroll.off('scroll', handleScroll);
        }
      };

      scroll.on('scroll', handleScroll);
    }
  }, [scroll, isReady, inView]);

  return (
    <NextLink href={href} passHref>
      <LinkTranslateEffect isInView={inView} ref={linkRef} {...otherProps}>
        <TextTranslateEffect
          textProps={{ className: 'animated-text-item top-5' }}
          textHoverProps={{ className: 'animated-text-item__hover' }}
        >
          {children}
        </TextTranslateEffect>
      </LinkTranslateEffect>
    </NextLink>
  );
};
