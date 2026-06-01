import { styled } from '@/stitches.config';
import { CSSProperties } from 'react';
import React from 'react';

const StyledText = styled('p', {
    display: 'inline-block',
    margin: 0,
    boxSizing: 'border-box',
    variants: {
        fill: {
            true: {
                color: 'white'
            },
            false: {
                color: 'black',
                textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white'
            }
        },
        lineHeight: {
            low: {
                lineHeight: 0.9
            },
            normal: {
                lineHeight: 1.0
            },
            medium: {
                lineHeight: 1.2
            },
            high: {
                lineHeight: 1.4
            }
        }
    },
    defaultVariants: {
        fill: true,
        lineHeight: 'normal'
    }
});

/**
 * 	Text component. Used globally throughout the app to easily set the font size,
 *  color and line height.
 *  Takes @param {string} size - The size of the text.
 *  Since AFAIK there is no way to create a dynamic variant in Stitches
 */
const Text: React.FC<
    React.PropsWithChildren<{ size?: string; css?: CSSProperties } & React.ComponentProps<typeof StyledText>>
> = ({ size, css, children, ...props }) => {
    return (
        <StyledText
            css={{
                fontSize: size ?? '',
                ...css
            }}
            {...props}>
            {children}
        </StyledText>
    );
};

export default Text;
