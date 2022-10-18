import { ReactNode } from 'react';
import { MantineProvider as Provider } from '@mantine/core';

export const MantineProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider withGlobalStyles withNormalizeCSS>
      {children}
    </Provider>
  );
};
