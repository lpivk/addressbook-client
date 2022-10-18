import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { MantineProvider } from './providers/MantineProvider';

import { AuthContextProvider } from '@modules/auth/context';

export const App = () => {
  return (
    <ReactQueryProvider>
      <MantineProvider>
        <AuthContextProvider>
          <div>App</div>
        </AuthContextProvider>
      </MantineProvider>
    </ReactQueryProvider>
  );
};
