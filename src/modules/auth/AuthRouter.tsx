import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen';
import { ResetPasswordScreen } from './screens/ResetPasswordScreen';
import { ActivationScreen } from './screens/ActivationScreen';

export const AuthRouter = () => {
  return (
    <Routes>
      <Route index element={<LoginScreen />} />
      <Route path='/signup' element={<SignupScreen />} />
      <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
      <Route
        path='/reset-password/:accessToken'
        element={<ResetPasswordScreen />}
      />
      <Route path='/activate/:activationToken' element={<ActivationScreen />} />
      <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  );
};
