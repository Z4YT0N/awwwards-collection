import { getCssText } from '@/stitches.config';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* SEO tags */}
                <meta
                    name="description"
                    content={`The basement.studio frontend challenge which consists of building a web application following a Figma
					file that showcases the products of the basement.studio brand.`}
                />
                <meta name="theme-color" content="#000000" />
                <meta content="#000000" name="msapplication-TileColor" />
                <meta content="Basement Challenge" name="og:title" />
                <meta content={`/assets/og.png`} property="og:image" />
                <meta content="website" property="og:type" />
                {/* Preload fonts as soon as possible */}
                <link
                    rel="preload"
                    href="/fonts/basementgrotesque.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                {/* Taken from leerob's website :) */}
                {/* Favicons generated for each device */}
                <link href="/favicons/favicon.ico" rel="shortcut icon" />
                <link href="/favicons/favicon.png" rel="icon" sizes="260x260" type="image/png" />
                <link href="/favicons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
                <link href="/favicons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
                <link href="/favicons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
                <link href="/favicons/android-chrome-192x192.png" rel="icon" sizes="192x192" type="image/png" />
                <link href="/favicons/android-chrome-512x512.png" rel="icon" sizes="512x512" type="image/png" />
                {/* Stitches SSR */}
                <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
