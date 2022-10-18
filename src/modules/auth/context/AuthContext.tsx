import { createContext } from 'react';

import { User } from '@shared/types';

type AuthContext = {
  user: User | undefined;
  login: (user: User) => void;
  logout: () => void;
};

const initialContext: AuthContext = {
  user: undefined,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(initialContext);
