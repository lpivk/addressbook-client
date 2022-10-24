import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { MantineProvider } from './providers/MantineProvider';

import { AuthContextProvider } from '@modules/auth/context';
import { RootRouter } from '@modules/navigation/RootRouter';

export const App = () => {
  return (
    <ReactQueryProvider>
      <MantineProvider>
        <AuthContextProvider>
          <RootRouter />
        </AuthContextProvider>
      </MantineProvider>
    </ReactQueryProvider>
  );
};
