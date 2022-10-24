import { AxiosResponse } from 'axios';

import { authAxios } from '@shared/api';
import { User } from '@shared/types';

import { LoginRequest, SignupRequest, ForgotPasswordRequest } from '../types';

const login = async (data: LoginRequest): Promise<User> => {
  const response: AxiosResponse<User> = await authAxios.post('auth/login', data);

  return response.data;
};

const signup = async (data: SignupRequest): Promise<string> => {
  const response: AxiosResponse<{ message: string }> = await authAxios.post(
    'auth/signup',
    data
  );

  return response.data.message;
};

const forgotPassword = async (data: ForgotPasswordRequest): Promise<string> => {
  const response: AxiosResponse<{ message: string }> = await authAxios.post(
    'auth/forgot-password',
    data
  );

  return response.data.message;
};

export const authApi = {
  login,
  signup,
  forgotPassword,
};
