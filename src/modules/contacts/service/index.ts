import _ from 'lodash';
import { Contact } from '../../../shared/types';

const filterContacts = (
  contacts: Contact[] | undefined,
  name: string,
  surname: string
) =>
  _.filter(contacts, (contact) => {
    if (!contact.name.toLowerCase().includes(name)) return false;
    if (!contact.surname.toLowerCase().includes(surname)) return false;
    return true;
  });

export const contactService = {
  filterContacts,
};
