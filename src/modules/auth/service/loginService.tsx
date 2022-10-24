import * as yup from 'yup';
import { yupResolver } from '@mantine/form';

import { LoginRequest } from '../types';

export const validationSchema = yupResolver(
  yup.object({
    username: yup
      .string()
      .min(3, 'Username is at least three characters long')
      .required('Required field'),
    password: yup
      .string()
      .min(8, 'Password is at least eight characters long')
      .required('Required field'),
  })
);

export const initialValues: LoginRequest = {
  username: '',
  password: '',
};
