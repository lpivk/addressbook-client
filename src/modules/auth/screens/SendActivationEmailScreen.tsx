import { Center, Text, useToast, VStack } from '@chakra-ui/react';
import { Button } from '../../../shared/ui';
import { apiService } from '../../../shared/api';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';

export const SendActivationEmailScreen = () => {
  const { user, logout } = useContext(AuthContext);

  const toast = useToast();
  const { mutate: sendEmailRequest, isLoading } = useMutation(
    apiService.sendActivationEmail,
    {
      onSuccess: (response) => {
        toast({
          status: 'success',
          title: 'Success',
          description: response.message,
          isClosable: true,
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
        });
      },
    }
  );

  const handleSendEmail = () => sendEmailRequest(user?.details.email);

  return (
    <Center h={'100vh'}>
      <VStack
        h='360px'
        justify={'space-between'}
        border={'1px'}
        borderColor='gray.200'
        borderRadius={40}
        p={20}
      >
        <VStack w={'500px'}>
          <Text fontSize={'2xl'}>Welcome, {user?.details.username}!</Text>
          <Text>You need to activate your account before using it.</Text>
          <Button
            label='SEND EMAIL'
            onClick={handleSendEmail}
            isLoading={isLoading}
          />
        </VStack>
        <Button label='LOG OUT' onClick={logout} />
      </VStack>
    </Center>
  );
};
