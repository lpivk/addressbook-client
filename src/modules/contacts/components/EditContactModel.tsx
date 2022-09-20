import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { Form, Formik, FormikHelpers } from 'formik';
import { useCallback, useContext } from 'react';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { Contact, NewContact } from '../../../shared/types';
import { Button, TextInput } from '../../../shared/ui';
import { AuthContext } from '../../auth/AuthContext';
import { contactApi } from '../service/api';

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

interface EditContactModelProps extends Omit<ModalProps, 'children'> {
  contact: Contact;
  refresh: () => void;
}

export const EditContactModel: React.FC<EditContactModelProps> = ({
  isOpen,
  onClose,
  contact,
  refresh,
}) => {
  const { user } = useContext(AuthContext);
  const { name, surname, email, phone } = contact;
  const toast = useToast();

  const { mutate: editContactRequest, isLoading } = useMutation(
    contactApi.editContact,
    {
      onSuccess: (message) => {
        toast({
          status: 'success',
          title: 'Success',
          description: message,
          isClosable: true,
        });
        onClose();
        refresh();
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
    (values: NewContact) => {
      editContactRequest({
        ...values,
        id: contact._id,
        userId: user?.details._id,
      });
    },
    [editContactRequest, contact._id, user?.details._id]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth={'1000px'} w={'fit-content'}>
        <ModalHeader>Edit?</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ name, surname, email, phone } as NewContact}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form style={{ width: '500px' }}>
            <ModalBody>
              <TextInput name='name' label='Name' isRequired />
              <TextInput name='surname' label='Surname' isRequired />
              <TextInput name='email' label='Email' isRequired />
              <TextInput name='phone' label='Phone Number' isRequired />
            </ModalBody>

            <ModalFooter as={HStack}>
              <Button label='Close' onClick={onClose} colorScheme='gray' />
              <Button type='submit' label='Save' isLoading={isLoading} />
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};
