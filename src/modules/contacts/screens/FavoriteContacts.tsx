import { ChangeEventHandler, useContext, useEffect, useState } from 'react';
import { Center, Flex, HStack, useToast } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { contactService } from '../service';
import { contactApi } from '../service/api';
import { SearchInput } from '../../../shared/ui';
import { Contact, Styles } from '../../../shared/types';
import { AxiosError } from 'axios';
import { ContactsTable } from '../components/ContactsTable';
import { AuthContext } from '../../auth/AuthContext';

export const FavoriteContacts = () => {
  const toast = useToast();
  const { user } = useContext(AuthContext);

  const {
    data: fetchedFavoriteContacts,
    isFetching,
    refetch,
  } = useQuery(
    'favoriteContacts',
    () => contactApi.getFavoriteContacts(user?.details._id),
    {
      onSuccess: (data) => setFavoriteContacts(data),
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

  const [favoriteContacts, setFavoriteContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setName(e.target.value.toLowerCase());
  const handleSurnameChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setSurname(e.target.value.toLowerCase());

  useEffect(() => {
    const filteredContacts = contactService.filterContacts(
      fetchedFavoriteContacts,
      name,
      surname
    );
    setFavoriteContacts(filteredContacts);
  }, [fetchedFavoriteContacts, name, surname]);

  return (
    <Flex flexDirection={'column'} w={'80%'} justify='center' margin={'auto'}>
      <Center sx={styles.options}>
        <HStack w={'100%'} justify={'space-between'}>
          <HStack>
            <SearchInput placeholder='Name' onChange={handleNameChange} />
            <SearchInput placeholder='Surname' onChange={handleSurnameChange} />
          </HStack>
        </HStack>
      </Center>
      <ContactsTable
        data={favoriteContacts}
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
