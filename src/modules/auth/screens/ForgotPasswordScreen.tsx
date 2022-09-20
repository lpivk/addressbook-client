import { useCallback } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../../../shared/ui/TextInput';
import { Center, HStack, Link, useToast, VStack } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { apiService } from '../../../shared/api/index';
import { Button } from '../../../shared/ui';
import { ForgotPasswordCredentials } from '../../../shared/types';
import { AxiosError } from 'axios';
import { Link as RLink } from 'react-router-dom';

const initalValues: ForgotPasswordCredentials = {
  email: '',
};

const validationSchema = Yup.object({
  email: Yup.string().required('Required.').email('Invalid email format.'),
});

export const ForgotPasswordScreen = () => {
  const toast = useToast();

  const { mutate: forgotPasswordRequest, isLoading: isLoggingIn } = useMutation(
    apiService.forgotPassword,
    {
      onSuccess: (response) => {
        toast({
          status: 'success',
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

  const handleSubmit = useCallback(
    (
      values: ForgotPasswordCredentials,
      actions: FormikHelpers<ForgotPasswordCredentials>
    ) => {
      forgotPasswordRequest(values);
      actions.resetForm();
    },
    [forgotPasswordRequest]
  );

  return (
    <Center h={'100vh'}>
      <VStack border={'1px'} borderColor='gray.200' borderRadius={40} p={20}>
        <Formik
          initialValues={initalValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form style={{ width: '500px' }}>
            <TextInput name='email' label='Email' isRequired />
            <Button type='submit' label='SEND' isLoading={isLoggingIn} />
          </Form>
        </Formik>
        <HStack w={'100%'} justify={'space-between'}>
          <Link as={RLink} to='/'>
            Log In
          </Link>
        </HStack>
      </VStack>
    </Center>
  );
};
