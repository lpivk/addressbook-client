import { useCallback, useContext } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../../../shared/ui/TextInput';
import { Center, HStack, Link, useToast, VStack } from '@chakra-ui/react';
import { PasswordInput } from '../../../shared/ui/PasswordInput';
import { useMutation } from 'react-query';
import { Button } from '../../../shared/ui';
import { NewContact } from '../../../shared/types';
import { AxiosError } from 'axios';
import { Link as RLink } from 'react-router-dom';
import { contactApi } from '../service/api';
import { AuthContext } from '../../auth/AuthContext';

const initialValues: NewContact = {
  name: '',
  surname: '',
  email: '',
  phone: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Required.')
    .min(2, 'Must have at least two characters.')
    .max(20, 'Must not be longer than 20 characters.')
    .matches(/^[a-zA-Z]+$/, 'Must contain only letters.'),
  surname: Yup.string()
    .required('Required.')
    .min(2, 'Must have at least two characters.')
    .max(20, 'Must not be longer than 20 characters.')
    .matches(/^[a-zA-Z]+$/, 'Must contain only letters.'),

  email: Yup.string().email('Invalid email format.'),
  phone: Yup.string()
    .min(8, 'Invalid phone number format.')
    .max(12, 'Invalid phone number format.')
    .matches(/^[+0-9]+$/, 'Invalid phone number format.'),
});

export const AddNewContact = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const { mutate: newContactRequest, isLoading } = useMutation(
    contactApi.addNewContact,
    {
      onSuccess: () => {
        toast({
          status: 'success',
          title: 'Success',
          description: 'You have saved a new users into your collection.',
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
    (values: NewContact, actions: FormikHelpers<NewContact>) => {
      newContactRequest({ ...values, userId: user?.details._id });
      actions.resetForm();
    },
    [newContactRequest, user?.details._id]
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
            <TextInput name='name' label='Name' isRequired />
            <TextInput name='surname' label='Surname' isRequired />
            <TextInput name='email' label='Email' isRequired />
            <TextInput name='phone' label='Phone Number' isRequired />
            <Button type='submit' label='Save' isLoading={isLoading} />
          </Form>
        </Formik>
      </VStack>
    </Center>
  );
};
