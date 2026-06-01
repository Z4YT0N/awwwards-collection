import Cart from '@/components/cart/Cart';
import Circle from '@/components/svgs/Circle';
import Eye from '@/components/svgs/Eye';
import FourK from '@/components/svgs/FourK';
import HD from '@/components/svgs/HD';
import Warning from '@/components/svgs/Warning';
import { styled } from '@/stitches.config';

const StyledNavigation = styled('nav', {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '12px 2.5vw 0',

    '@sm2': {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr'
    }
});

const StyledLogo = styled('a', {
    color: 'white',
    fontSize: '2rem',
    textDecoration: 'none',
    marginY: 30,

    variants: {
        visible: {
            true: {
                display: 'block'
            },
            false: {
                display: 'none'
            }
        }
    }
});

const StyledFlex = styled('span', {
    display: 'flex',
    alignItems: 'center'
});

const Navigation: React.FC = () => {
    return (
        <StyledNavigation>
            <StyledFlex>
                <StyledLogo
                    href="https://basement.studio"
                    rel="noreferrer noopener"
                    visible={{
                        '@initial': 'false',
                        '@sm2': true
                    }}>
                    basement
                </StyledLogo>
                <StyledLogo
                    href="https://basement.studio"
                    rel="noreferrer noopener"
                    visible={{
                        '@initial': true,
                        '@sm2': false
                    }}>
                    b.
                </StyledLogo>
            </StyledFlex>
            <StyledFlex
                css={{
                    justifyContent: 'center',
                    gap: 16,

                    display: 'none',
                    '@sm2': {
                        display: 'flex'
                    }
                }}>
                <Circle />
                <HD />
                <Eye />
                <FourK />
                <Warning />
            </StyledFlex>
            <StyledFlex
                css={{
                    justifyContent: 'flex-end'
                }}>
                <Cart />
            </StyledFlex>
        </StyledNavigation>
    );
};

export default Navigation;
