import { useCallback, useContext } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../../../shared/ui/TextInput';
import { Center, HStack, Link, useToast, VStack } from '@chakra-ui/react';
import { PasswordInput } from '../../../shared/ui/PasswordInput';
import { useMutation } from 'react-query';
import { apiService } from '../../../shared/api/index';
import { Button } from '../../../shared/ui';
import { LoginCredentials } from '../../../shared/types';
import { AxiosError } from 'axios';
import { AuthContext } from '../AuthContext';
import { Link as RLink } from 'react-router-dom';

const initialValues: LoginCredentials = {
  username: '',
  password: '',
};

const validationSchema = Yup.object({
  username: Yup.string().required('Required.'),
  password: Yup.string().required('Required!'),
});

export const LoginScreen = () => {
  const toast = useToast();
  const { login } = useContext(AuthContext);

  const { mutate: loginRequest, isLoading: isLoggingIn } = useMutation(
    apiService.login,
    {
      onSuccess: (user) => {
        login(user);
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
    (values: LoginCredentials, actions: FormikHelpers<LoginCredentials>) => {
      loginRequest(values);
      actions.resetForm();
    },
    [loginRequest]
  );

  return (
    <Center h={'100vh'}>
      <VStack border={'1px'} borderColor='gray.200' borderRadius={40} p={20}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form style={{ width: '500px' }}>
            <TextInput name='username' label='Username' isRequired />
            <PasswordInput name='password' label='Password' />
            <Button type='submit' label='LOGIN' isLoading={isLoggingIn} />
          </Form>
        </Formik>
        <HStack w={'100%'} justify={'space-between'}>
          <Link as={RLink} to='/forgot-password'>
            Forgot password?
          </Link>
          <Link as={RLink} to='/signup'>
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Center>
  );
};
