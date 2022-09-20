import { CSSProperties } from 'react';

export interface Styles {
  [key: string]: CSSProperties;
}

export type LoginCredentials = {
  username: string;
  password: string;
};
export type SignupCredentials = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ForgotPasswordCredentials = {
  email: string;
};

export type ResetPasswordCredentials = {
  password: string;
  confirmPassword: string;
};

export type User = {
  token: string;
  details: {
    _id: string;
    username: string;
    email: string;
    isActive: boolean;
    role?: string;
    createdAt?: Date;
  };
};

export type Contact = {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  userId: string;
  createdAt: Date;
  isFavorite: boolean;
};

export type NewContact = {
  name: string;
  surname: string;
  email?: string;
  phone?: string;
};
