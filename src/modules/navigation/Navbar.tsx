import { HStack, Flex, Image, IconButton } from '@chakra-ui/react';

import { Colors } from '../../shared/assets/colors';
import Logo from '../../shared/assets/images/A.png';

import {
  IoHomeOutline,
  IoPeopleOutline,
  IoStarOutline,
  IoLogOutOutline,
} from 'react-icons/io5';
import { useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { useContext } from 'react';

export const Navbar = () => {
  const { pathname } = useLocation();
  const { logout } = useContext(AuthContext);

  return (
    <Flex
      w={'100vw'}
      justify={'center'}
      align={'center'}
      h={'75px'}
      border={`1px solid ${Colors.gray[200]}`}
      boxShadow={'0px 3px 8px 4px rgba(0,0,0,0.1)'}
    >
      <HStack w={'50%'} justify='space-between'>
        <Image src={Logo} h={'40px'} w={'40px'} />
        <IconButton
          as={Link}
          to='/home'
          icon={
            <IoHomeOutline
              fontSize={'25px'}
              color={
                pathname.includes('home') ? Colors.teal[600] : Colors.gray[400]
              }
            />
          }
          aria-label={'Home'}
          variant='outline'
          size='lg'
          colorScheme={pathname.includes('home') ? 'teal' : 'gray'}
        />
        <IconButton
          as={Link}
          to='/contacts'
          icon={
            <IoPeopleOutline
              fontSize={'25px'}
              color={
                pathname.includes('contacts')
                  ? Colors.teal[600]
                  : Colors.gray[400]
              }
            />
          }
          aria-label={'Home'}
          variant='outline'
          size='lg'
          colorScheme={pathname.includes('contacts') ? 'teal' : 'gray'}
        />
        <IconButton
          as={Link}
          to='/favorites'
          icon={
            <IoStarOutline
              fontSize={'25px'}
              color={
                pathname.includes('favorites')
                  ? Colors.teal[600]
                  : Colors.gray[400]
              }
            />
          }
          aria-label={'Home'}
          variant='outline'
          size='lg'
          colorScheme={pathname.includes('favorites') ? 'teal' : 'gray'}
        />
        <IconButton
          onClick={logout}
          icon={<IoLogOutOutline fontSize={'25px'} />}
          aria-label={'Log Out'}
          variant='outline'
          size='lg'
          colorScheme={'red'}
        />
      </HStack>
    </Flex>
  );
};
