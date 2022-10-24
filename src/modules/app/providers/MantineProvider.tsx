import { ReactNode } from 'react';
import { MantineProvider as Provider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

export const MantineProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider position="top-right">{children}</NotificationsProvider>
    </Provider>
  );
};
