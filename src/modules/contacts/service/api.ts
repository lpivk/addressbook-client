import axios, { AxiosResponse } from 'axios';

import { Contact, NewContact } from '../../../shared/types';

const url = 'https://nwp-addressbook-server.herokuapp.com/api/';

const getContacts = async (userId: string | undefined) => {
  const response: AxiosResponse<Contact[]> = await axios.get(url + 'contacts', {
    params: { userId },
  });

  return response.data;
};

const addNewContact = async (
  contact: NewContact & { userId: string | undefined }
) => {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    url + 'contacts',
    contact
  );

  return response.data.message;
};

const editContact = async (
  contact: NewContact & { id: string; userId: string | undefined }
) => {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    url + 'contacts/edit/' + contact.id,
    contact
  );
  return response.data.message;
};

const deleteContact = async (id: string) => {
  const response: AxiosResponse<{ message: string }> = await axios.delete(
    url + 'contacts/' + id
  );

  return response.data.message;
};

const favoriteContact = async (id: string) => {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    url + 'contacts/favorite/' + id
  );

  return response.data.message;
};

const unfavoriteContact = async (id: string) => {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    url + 'contacts/unfavorite/' + id
  );

  return response.data.message;
};

const getFavoriteContacts = async (userId: string | undefined) => {
  const response: AxiosResponse<Contact[]> = await axios.get(
    url + `contacts/favorites/${userId!}`
  );

  return response.data;
};

export const contactApi = {
  getContacts,
  addNewContact,
  editContact,
  deleteContact,
  favoriteContact,
  unfavoriteContact,
  getFavoriteContacts,
};
