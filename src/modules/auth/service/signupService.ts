import * as yup from 'yup';
import { yupResolver } from '@mantine/form';

import { SignupRequest } from '../types';

export const validationSchema = yupResolver(
  yup.object({
    username: yup
      .string()
      .required('Required field')
      .matches(/^[a-z]/i, 'Must start with a letter')
      .min(3, 'Must be at least three characters long')
      .max(12, 'Must not be longer than 12 characters')
      .matches(/^[a-zA-Z0-9]+$/, 'Must contain only letters and numbers'),
    email: yup.string().required('Required field').email('Invalid email format'),
    password: yup
      .string()
      .required('Required field')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Must be at least eight characters long, with one letter and one number'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords do not match'),
  })
);

export const initialValues: SignupRequest = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
