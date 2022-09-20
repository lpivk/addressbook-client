import { Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../shared/ui';

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
