import { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { Center } from '@chakra-ui/react';

import { Button } from '../../shared/ui';
import { AuthContext } from '../auth/AuthContext';

import { AuthRouter } from '../auth/AuthRouter';
import { Navbar } from '../navigation/Navbar';
import { SendActivationEmailScreen } from '../auth/screens/SendActivationEmailScreen';
import { Contacts } from '../contacts/screens/Contacts';
import { AddNewContact } from '../contacts/screens/AddNewContact';
import { FavoriteContacts } from '../contacts/screens/FavoriteContacts';

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

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Center h='90vh' w='100%'>
      <div
        style={{
          width: '300px',
          height: '150px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Button
          label='ADD NEW CONTACT'
          onClick={() => navigate('/contacts/add-new-contact')}
        />
        <Button
          label='ALL CONTACTS'
          variant='outline'
          onClick={() => navigate('/contacts')}
        />
        <Button
          label='FAVORITES'
          variant='outline'
          onClick={() => navigate('/favorites')}
        />
      </div>
    </Center>
  );
};
