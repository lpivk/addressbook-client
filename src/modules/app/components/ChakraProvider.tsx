import { ReactNode } from 'react';
import { ChakraProvider as Provider, extendTheme } from '@chakra-ui/react';

import { Colors } from '../../../shared/assets/colors';

const theme = extendTheme({
  fonts: {
    body: 'Poppins',
  },
  colors: {
    ...Colors,
  },
});

export const ChakraProvider = ({ children }: { children: ReactNode }) => {
  return <Provider theme={theme}>{children}</Provider>;
};
