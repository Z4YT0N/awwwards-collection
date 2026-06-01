import { globalCss } from '@/stitches.config';
import { RealViewportProvider } from 'next-real-viewport';
import type { AppProps } from 'next/app';

const globalStyles = globalCss({
    '@font-face': {
        fontFamily: 'BasementGrotesque',
        fontStyle: 'normal',
				/**
				 * 	In this case I opted for fontDisplay: 'block' because the font is really really
				 *  important for branding and I would rather have a blank space than a fallback
				 *  font that doesn't look good.
				 *  More info on this can be found at:
				 *  https://www.youtube.com/watch?v=G0cOQ79WKZE&ab_channel=LeeRobinson &
				 *  https://solutions-loading-web-fonts.vercel.app/
				 */
        fontDisplay: 'block',
        src: 'url("/fonts/basementgrotesque.woff2") format("woff2")'
    },
    '*': {
        boxSizing: 'border-box',
        '&::selection': {
            color: 'black',
            backgroundColor: 'white'
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'black'
        },
        '&::-webkit-scrollbar': {
            width: '10px'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'white'
        }
    },
    'html, body': {
        backgroundColor: 'black',
        margin: 0,
        padding: 0,
        textRendering: 'geometricPrecision',
        fontFamily: `"BasementGrotesque", "Helvetica Neue", sans-serif`
    },
    img: {
        userSelect: 'none'
    }
});

function MyApp({ Component, pageProps }: AppProps) {
    globalStyles();

    return (
        <RealViewportProvider>
            <Component {...pageProps} />
        </RealViewportProvider>
    );
}

export default MyApp;
