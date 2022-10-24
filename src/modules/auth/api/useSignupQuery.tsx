import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IoClose, IoCheckmark } from 'react-icons/io5';
import { showNotification } from '@mantine/notifications';

import { authApi } from './api';

export const useSignupQuery = () => {
  const navigate = useNavigate();

  const { mutate: signupQuery, isLoading: isSigningUp } = useMutation(authApi.signup, {
    onSuccess: (message) => {
      showNotification({
        title: 'Success',
        message,
        icon: <IoCheckmark />,
        color: 'teal',
      });
      setTimeout(() => navigate('/'), 1500);
    },
    onError: (e: AxiosError<{ message: string }>) =>
      showNotification({
        title: 'Error',
        message: e.response?.data.message,
        icon: <IoClose />,
        color: 'red',
      }),
  });

  return { signupQuery, isSigningUp };
};
