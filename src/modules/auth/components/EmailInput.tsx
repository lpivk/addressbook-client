import { TextInput, TextInputProps } from '@mantine/core';
import { IoMailOutline } from 'react-icons/io5';

export const EmailInput: React.FC<Partial<TextInputProps>> = ({ ...props }) => {
  return (
    <TextInput
      label="E-mail"
      withAsterisk
      icon={<IoMailOutline />}
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
