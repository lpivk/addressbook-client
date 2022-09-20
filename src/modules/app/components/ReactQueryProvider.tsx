import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider as Provider } from 'react-query';

const client = new QueryClient();

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  return <Provider client={client}>{children}</Provider>;
};
