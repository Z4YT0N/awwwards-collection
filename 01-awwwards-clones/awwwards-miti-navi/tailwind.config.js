module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: {
        100: '#232323',
        500: '#000E13',
        550: '#001014',
      },
      blue: '#b3d4fc',
      cream: {
        50: '#e6dece',
        100: '#e7decf',
        150: '#E8DED0',
        500: '#FFDEAD',
      },
      gray: {
        100: '#999',
        300: '#b9b9b9',
      },
      white: '#fff',
    },
    screens: {
      md: '768px', // => @media (min-width: 768px) { ... }
      lg: '992px', // => @media (min-width: 992px) { ... }
      xl: '1091px', // => @media (min-width: 1091px) { ... }
      xxl: '1200px', // => @media (min-width: 1200px) { ... }
    },
    extend: {
      flex: {
        '0-auto': '0 0 auto',
      },
      fontFamily: {
        voyage: ['Voyage'],
        'gt-pressura-mono': ['GTPressuraMono'],
        'gt-sectra-display': ['GTSectraDisplay'],
      },
      fontSize: {
        xxs: ['0.625rem', 1.4],
      },
      inset: {
        15: '3.75rem',
        25: '6.25rem',
      },
      letterSpacing: {
        px: '1px',
      },
      lineHeight: {
        normal: '1.4',
      },
      maxWidth: {
        '7.5xl': '73.75rem',
        '8xl': '82.5rem',
        '1/3': '33.333%',
      },
      scale: {
        80: '0.8',
      },
      spacing: {
        7.5: '1.875rem',
        15: '3.75rem',
        100: '25rem',
        184: '46rem',
        244: '61rem',
      },
      transitionDelay: {
        none: '0ms',
        600: '600ms',
        1200: '1200ms',
        2750: '2750ms',
      },
      transitionDuration: {
        600: '600ms',
        1600: '1600ms',
      },
      transitionProperty: {
        top: 'top',
        width: 'width',
      },
      transitionTimingFunction: {
        normal: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        miti: 'cubic-bezier(0.82, 0, 0.36, 1)',
      },
      zIndex: {
        1: '1',
        '-1': '-1',
      },
      width: {
        logo: '120px',
        'logo-loader': '50px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
