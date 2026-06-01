'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode';

import { customTheme } from '../../utils/customTheme';

export function Provider(props) {
  return (
    <ChakraProvider value={customTheme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
