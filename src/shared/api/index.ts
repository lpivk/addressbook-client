import axios, { AxiosResponse } from 'axios';
import {
  LoginCredentials,
  SignupCredentials,
  ForgotPasswordCredentials,
  User,
  ResetPasswordCredentials,
} from '../types';

const url: string = process.env.API_URL!;

const login = async (credentials: LoginCredentials) => {
  const response: AxiosResponse<User> = await axios.post(
    url + 'auth/login',
    credentials
  );
  return response.data;
};

const signup = async (credentials: SignupCredentials) => {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    url + 'auth/signup',
    credentials
  );
  return response.data;
};

const forgotPassword = async (credentials: ForgotPasswordCredentials) => {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    url + 'auth/forgot-password',
    credentials
  );
  return response.data;
};

const activateAccount = async (activationToken: string | undefined) => {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    url + 'auth/activate',
    { activationToken }
  );
  return response.data;
};

const resetPassword = async ({
  accessToken,
  credentials,
}: {
  accessToken: string | undefined;
  credentials: ResetPasswordCredentials;
}) => {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    url + 'auth/reset-password',
    { accessToken, password: credentials.password }
  );
  return response.data;
};

const sendActivationEmail = async (email: string | undefined) => {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    url + 'auth/activate/send-email',
    { email }
  );
  return response.data;
};

export const apiService = {
  login,
  signup,
  forgotPassword,
  activateAccount,
  resetPassword,
  sendActivationEmail,
};
