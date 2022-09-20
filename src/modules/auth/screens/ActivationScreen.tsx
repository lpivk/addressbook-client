import { Center, useToast, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { apiService } from '../../../shared/api';
import { AxiosError } from 'axios';

export const ActivationScreen = () => {
  const { activationToken } = useParams();
  const toast = useToast();

  const { mutate: activationRequest, isLoading } = useMutation(
    apiService.activateAccount,
    {
      onSuccess: (response) => {
        toast({
          status: 'success',
          description: response.message,
          isClosable: true,
          duration: null,
        });
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast({
          status: 'error',
          title: 'Error',
          description: error.response?.data
            ? error.response?.data.message
            : error.message,
          isClosable: true,
          duration: null,
        });
      },
    }
  );

  useEffect(() => {
    activationRequest(activationToken);
  }, [activationRequest, activationToken]);

  return (
    <Center h={'100vh'}>
      {isLoading && (
        <Spinner
          thickness='4px'
          emptyColor='gray.200'
          color='teal.500'
          size='xl'
        />
      )}
    </Center>
  );
};
