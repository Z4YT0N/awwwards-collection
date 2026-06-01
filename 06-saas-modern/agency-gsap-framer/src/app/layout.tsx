'use client';

import Lenis from 'lenis';

import { Montserrat } from 'next/font/google';
import { useEffect, useState } from 'react';

const montserrat = Montserrat({ subsets: ['latin'] });

import '@/shared/styles/globals.scss';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [dimension, setDimension] = useState<any>(null);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', resize);
    requestAnimationFrame(raf);
    resize();

    requestAnimationFrame(raf);
  }, []);
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
