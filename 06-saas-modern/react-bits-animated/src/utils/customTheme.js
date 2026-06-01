import { createSystem, defaultConfig, defineSlotRecipe } from '@chakra-ui/react';

const drawerRecipe = defineSlotRecipe({
  className: 'drawer',
  slots: ['content'],
  base: {
    content: {
      w: '100vw',
      h: '100vh'
    }
  }
});

const tabsRecipe = defineSlotRecipe({
  className: 'tabs',
  slots: ['trigger'],
  base: {
    trigger: {
      flex: '0 0 auto',
      bg: '#120F17',
      borderRadius: '10px',
      fontSize: '14px',
      border: '1px solid #2F293A',
      h: 9,
      px: '1rem',
      transition: 'background-color .3s',

      _hover: { bg: '#2F293A' },

      "&[data-state='active']": {
        color: '#fff',
        bg: '#2F293A'
      }
    }
  }
});

export const toastStyles = {
  style: {
    fontSize: '12px',
    borderRadius: '0.75rem',
    border: '1px solid #2F293A',
    color: '#fff',
    backgroundColor: '#120F17',
    textAlign: 'center'
  }
};

export const customTheme = createSystem(defaultConfig, {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  },

  styles: {
    global: {
      'html, body': {
        minHeight: '100vh',
        fontFamily: '"Geist", sans-serif',
        backgroundColor: '#120F17'
      }
    }
  },

  components: {
    Slider: {
      baseStyle: {
        thumb: { bg: '#fff', _focus: { boxShadow: 'none' } }
      },
      variants: {
        solid: {
          track: { bg: '#2F293A' },
          filledTrack: { bg: '#fff' }
        }
      },
      defaultProps: { variant: 'solid' }
    },
    Switch: {
      baseStyle: {
        track: {
          bg: '#2F293A',
          _checked: { bg: '#5227FF' },
          _focus: { boxShadow: '0 0 0 3px #2F293A' },
          _active: { bg: '#5227FF' }
        },
        thumb: {
          _checked: { bg: 'white' },
          _active: { bg: 'white' }
        }
      }
    }
  },

  recipes: {
    drawer: drawerRecipe,
    tabs: tabsRecipe
  }
});
