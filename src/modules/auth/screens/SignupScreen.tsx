import { useCallback } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../../../shared/ui/TextInput';
import { Center, HStack, Link, useToast, VStack } from '@chakra-ui/react';
import { PasswordInput } from '../../../shared/ui/PasswordInput';
import { useMutation } from 'react-query';
import { apiService } from '../../../shared/api/index';
import { Button } from '../../../shared/ui';
import { SignupCredentials } from '../../../shared/types';
import { AxiosError } from 'axios';
import { Link as RLink } from 'react-router-dom';

const initialValues: SignupCredentials = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Required.')
    .matches(/^[a-z]/i, 'Must start with letter.')
    .min(3, 'Must have at least three characters.')
    .max(12, 'Must not be longer than 12 characters.')
    .matches(/^[a-zA-Z0-9]+$/, 'Must contain only letters and numbers.'),
  email: Yup.string().required('Required.').email('Invalid email format.'),
  password: Yup.string()
    .required('Required.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Minimum eight characters, at least one letter and one number.'
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords do not match.'
  ),
});

export const SignupScreen = () => {
  const toast = useToast();

  const { mutate: signupRequest, isLoading: isSigningUp } = useMutation(
    apiService.signup,
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
    (values: SignupCredentials, actions: FormikHelpers<SignupCredentials>) => {
      signupRequest(values);
      actions.resetForm();
    },
    [signupRequest]
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
            <TextInput name='email' label='Email' isRequired />
            <PasswordInput name='password' label='Password' />
            <PasswordInput name='confirmPassword' label='Confirm Password' />
            <Button type='submit' label='SIGN UP' isLoading={isSigningUp} />
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
