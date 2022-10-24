import * as yup from 'yup';
import { yupResolver } from '@mantine/form';

import { ForgotPasswordRequest } from '../types';

export const validationSchema = yupResolver(
  yup.object({
    email: yup.string().required('Required field').email('Invalid email format'),
  })
);

export const initialValues: ForgotPasswordRequest = {
  email: '',
};
