import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext } from '../auth/AuthContext';

import { AuthRouter } from '../auth/AuthRouter';
import { Navbar } from '../navigation/Navbar';

import { SendActivationEmailScreen } from '../auth/screens/SendActivationEmailScreen';
import { Contacts } from '../contacts/screens/Contacts';
import { AddNewContact } from '../contacts/screens/AddNewContact';
import { FavoriteContacts } from '../contacts/screens/FavoriteContacts';
import { HomePage } from '../home/HomePage';

export const RootRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {user ? (
        <>
          <Navbar />
          <Routes>
            {user.details.isActive ? (
              <>
                <Route path='' element={<Navigate to='/home' />} />
                <Route path='home' element={<HomePage />} />
                <Route path='contacts'>
                  <Route index element={<Contacts />} />
                  <Route path='add-new-contact' element={<AddNewContact />} />
                </Route>
                <Route path='favorites' element={<FavoriteContacts />} />
              </>
            ) : (
              <Route index element={<SendActivationEmailScreen />} />
            )}
          </Routes>
        </>
      ) : (
        <AuthRouter />
      )}
    </BrowserRouter>
  );
};
