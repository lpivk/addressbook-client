import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';

import { contactApi } from './api';

export const useDeleteContactQuery = () => {
  const toast = useToast();

  return useMutation(contactApi.deleteContact, {
    onSuccess: (message) => {
      toast({
        status: 'success',
        title: 'Success',
        description: message,
        isClosable: true,
      });
    },
    onError: (error: ApiError) => {
      toast({
        status: 'error',
        title: 'Error',
        description: error.response?.data
          ? error.response?.data.message
          : error.message,
        isClosable: true,
      });
    },
  });
};

type ApiError = AxiosError<{ message: string }>;
