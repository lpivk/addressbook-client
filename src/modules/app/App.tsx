import { useMemo, useState } from 'react';

import { ChakraProvider } from './components/ChakraProvider';
import { ReactQueryProvider } from './components/ReactQueryProvider';

import { AuthContext } from '../auth/AuthContext';
import { User } from '../../shared/types';

import { RootRouter } from './RootRouter';

export const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(() => {
    const login = (user: User) => setUser(user);
    const logout = () => setUser(null);

    return { user, login, logout };
  }, [user]);
  return (
    <ReactQueryProvider>
      <ChakraProvider>
        <AuthContext.Provider value={value}>
          <RootRouter />
        </AuthContext.Provider>
      </ChakraProvider>
    </ReactQueryProvider>
  );
};
