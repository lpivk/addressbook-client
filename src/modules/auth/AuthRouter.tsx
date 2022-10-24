import { Routes, Route, Navigate } from 'react-router-dom';

import { Activate, ForgotPassword, Login, ResetPassword, Signup } from './screens';

export const AuthRouter = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path={authRoutes.signup} element={<Signup />} />
      <Route path={authRoutes.forgotPassword} element={<ForgotPassword />} />
      <Route path={authRoutes.resetPassword} element={<ResetPassword />} />
      <Route path={authRoutes.activate} element={<Activate />} />

      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export const authRoutes = {
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password/:accessToken',
  activate: '/activate/:activationToken',
};
