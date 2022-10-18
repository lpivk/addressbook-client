import { ReactNode, useMemo, useState } from 'react';

import { User } from '@shared/types';
import { AuthContext } from './AuthContext';

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const value = useMemo(() => {
    const login = (user: User) => setUser(user);
    const logout = () => setUser(undefined);

    return { user, login, logout };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
