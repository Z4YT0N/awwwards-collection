import React from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import '../styles/globals.css';
import '../styles/locomotive-scroll.css';

function MyApp({ Component, pageProps }: AppProps) {
  const containerRef = React.useRef(null);
  const router = useRouter();

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
      }}
      watch={[router.asPath]}
      containerRef={containerRef}
    >
      <main data-scroll-container ref={containerRef}>
        <Component {...pageProps} />
      </main>
    </LocomotiveScrollProvider>
  );
}
export default MyApp;
