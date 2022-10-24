import { useContext } from 'react';
import { AuthContext } from '@modules/auth';
import { Button } from '@mantine/core';

export const Home = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      Home <Button onClick={() => logout()}>Log out</Button>
    </div>
  );
};
