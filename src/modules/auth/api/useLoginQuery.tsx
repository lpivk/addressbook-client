import { useContext } from 'react';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { IoClose } from 'react-icons/io5';
import { showNotification } from '@mantine/notifications';

import { AuthContext } from '../context';
import { authApi } from './api';

export const useLoginQuery = () => {
  const { login } = useContext(AuthContext);

  const { mutate: loginQuery, isLoading: isLoggingIn } = useMutation(authApi.login, {
    onSuccess: (user) => {
      login(user);
    },
    onError: (e: AxiosError<{ message: string }>) =>
      showNotification({
        title: 'Error',
        message: e.response?.data.message,
        icon: <IoClose />,
        color: 'red',
      }),
  });

  return { loginQuery, isLoggingIn };
};
