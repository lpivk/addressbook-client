import {
  PasswordInput as MantinePasswordInput,
  PasswordInputProps as MantinePasswordInputProps,
} from '@mantine/core';
import { IoLockClosedOutline } from 'react-icons/io5';

interface PasswordInputProps extends Partial<MantinePasswordInputProps> {
  confirmPassword?: boolean;
}

export const PasswordInput: React.FC<Partial<PasswordInputProps>> = ({
  confirmPassword,
  ...props
}) => {
  return (
    <MantinePasswordInput
      label={confirmPassword ? 'Confirm Password' : 'Password'}
      withAsterisk
      icon={<IoLockClosedOutline />}
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
