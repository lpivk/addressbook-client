import { useCallback } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';
import { Center, useToast } from '@chakra-ui/react';
import { PasswordInput } from '../../../shared/ui/PasswordInput';
import { useMutation } from 'react-query';
import { apiService } from '../../../shared/api/index';
import { Button } from '../../../shared/ui';
import { ResetPasswordCredentials } from '../../../shared/types';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';

const initialValues: ResetPasswordCredentials = {
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
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

export const ResetPasswordScreen = () => {
  const toast = useToast();
  const { accessToken } = useParams();

  const { mutate: resetPasswordRequest, isLoading } = useMutation(
    apiService.resetPassword,
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
      values: ResetPasswordCredentials,
      actions: FormikHelpers<ResetPasswordCredentials>
    ) => {
      resetPasswordRequest({ accessToken, credentials: values });
      actions.resetForm();
    },
    [accessToken, resetPasswordRequest]
  );

  return (
    <Center h={'100vh'}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form style={{ width: '500px' }}>
          <PasswordInput name='password' label='Password' />
          <PasswordInput name='confirmPassword' label='Confirm Password' />
          <Button type='submit' label='RESET' isLoading={isLoading} />
        </Form>
      </Formik>
    </Center>
  );
};
