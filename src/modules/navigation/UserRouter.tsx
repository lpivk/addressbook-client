import { Navigate, Route, Routes } from 'react-router-dom';

import { Home } from '@modules/home';

export const UserRouter = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};
