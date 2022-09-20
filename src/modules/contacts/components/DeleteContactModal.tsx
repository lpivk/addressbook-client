import { useEffect } from 'react';
import {
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  HStack,
} from '@chakra-ui/react';

import { useDeleteContactQuery } from '../service/hooks';

import { Contact } from '../../../shared/types';
import { Button } from '../../../shared/ui';

interface DeleteContactModelProps extends Omit<ModalProps, 'children'> {
  contact: Contact;
  refresh: () => void;
}

export const DeleteContactModal: React.FC<DeleteContactModelProps> = ({
  isOpen,
  onClose,
  contact,
  refresh,
}) => {
  const { name, surname } = contact;

  const {
    mutate: deleteContactRequest,
    isLoading,
    isSuccess,
  } = useDeleteContactQuery();

  useEffect(() => {
    if (isSuccess) {
      onClose();
      refresh();
    }
  }, [isSuccess]);

  const handleDelete = () => {
    deleteContactRequest(contact._id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete contact {name + ' ' + surname}.
        </ModalBody>
        <ModalFooter as={HStack}>
          <Button label='Close' onClick={onClose} colorScheme='gray' />
          <Button label='Delete' onClick={handleDelete} isLoading={isLoading} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
