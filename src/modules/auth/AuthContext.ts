import { createContext } from 'react';
import { User } from '../../shared/types';

type AuthContext = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const initialContext: AuthContext = {
  user: null,
  login: () => console.log('login'),
  logout: () => console.log('logout'),
};

export const AuthContext = createContext(initialContext);
