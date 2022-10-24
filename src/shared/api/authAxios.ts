import axios from 'axios';

export const authAxios = axios.create({
  baseURL: 'https://nwp-addressbook-server.herokuapp.com/api/',
});
