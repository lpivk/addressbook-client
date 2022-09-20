import { ChangeEventHandler } from 'react';
import { Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';

import { Styles } from '../types';
import { Colors } from '../assets/colors';

interface SearchInputProps {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onChange,
}) => {
  return (
    <InputGroup>
      <Input
        type='text'
        onChange={onChange}
        placeholder={placeholder}
        _placeholder={styles.placeholder}
        sx={styles.input}
      />
      <InputRightElement>
        <Icon as={IoSearch} sx={styles.icon} color={Colors.purple[400]} />
      </InputRightElement>
    </InputGroup>
  );
};

const styles: Styles = {
  input: {
    width: '200px',
    height: '40px',
    borderRadius: '4px',
  },
  placeholder: {
    color: Colors.gray[200],
  },
  icon: {
    width: '24px',
    height: '24px',
  },
};
