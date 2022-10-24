import { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthContext, AuthRouter } from '@modules/auth';
import { UserRouter } from './UserRouter';

export const RootRouter = () => {
  const { user } = useContext(AuthContext);

  return <BrowserRouter>{user ? <UserRouter /> : <AuthRouter />}</BrowserRouter>;
};
