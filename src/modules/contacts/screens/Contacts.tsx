import { ChangeEventHandler, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center, Flex, HStack, useToast } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { contactService } from '../service';
import { contactApi } from '../service/api';
import { Button, SearchInput } from '../../../shared/ui';
import { Contact, Styles } from '../../../shared/types';
import { AxiosError } from 'axios';
import { ContactsTable } from '../components/ContactsTable';
import { AuthContext } from '../../auth/AuthContext';

export const Contacts = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useContext(AuthContext);

  const {
    data: fetchedContacts,
    isFetching,
    refetch,
  } = useQuery('contacts', () => contactApi.getContacts(user?.details._id), {
    onSuccess: (data) => setContacts(data),
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
  });

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setName(e.target.value.toLowerCase());
  const handleSurnameChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setSurname(e.target.value.toLowerCase());

  useEffect(() => {
    const filteredContacts = contactService.filterContacts(
      fetchedContacts,
      name,
      surname
    );
    setContacts(filteredContacts);
  }, [fetchedContacts, name, surname]);

  return (
    <Flex flexDirection={'column'} w={'80%'} justify='center' margin={'auto'}>
      <Center sx={styles.options}>
        <HStack w={'100%'} justify={'space-between'}>
          <HStack>
            <SearchInput placeholder='Name' onChange={handleNameChange} />
            <SearchInput placeholder='Surname' onChange={handleSurnameChange} />
          </HStack>
          <Button
            sx={{ width: '125px' }}
            label='Add new'
            onClick={() => navigate('/contacts/add-new-contact')}
          />
        </HStack>
      </Center>
      <ContactsTable
        data={contacts}
        isLoading={isFetching}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        refresh={() => refetch()}
      />
    </Flex>
  );
};

const styles: Styles = {
  options: {
    height: '60px',
    marginTop: '20px',
    marginBottom: '20px',
  },
};
