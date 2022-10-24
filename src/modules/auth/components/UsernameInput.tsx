import { TextInput, TextInputProps } from '@mantine/core';
import { IoPersonOutline } from 'react-icons/io5';

export const UsernameInput: React.FC<Partial<TextInputProps>> = ({ ...props }) => {
  return (
    <TextInput
      label="Username"
      withAsterisk
      icon={<IoPersonOutline />}
      placeholder="Enter here"
      styles={{
        root: {
          height: '74px',
        },
      }}
      {...props}
    />
  );
};
