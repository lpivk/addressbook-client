import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Center, Stack, Button, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

import { CustomStyles } from '@shared/types';
import { UsernameInput, EmailInput, PasswordInput } from '../components';
import { useSignupQuery } from '../api';
import { validationSchema, initialValues } from '../service/signupService';

export const Signup = () => {
  const form = useForm({
    initialValues,
    validate: validationSchema,
    validateInputOnBlur: true,
  });

  const { signupQuery, isSigningUp } = useSignupQuery();

  const handleSubmit = useCallback(
    () => form.onSubmit((values) => signupQuery(values)),
    [form.values]
  );

  return (
    <Center sx={styles.page}>
      <Stack spacing="lg" sx={styles.container}>
        <Text size="xl" weight={700}>
          Signup
        </Text>
        <form onSubmit={handleSubmit()}>
          <Stack spacing="sm">
            <UsernameInput {...form.getInputProps('username')} />
            <EmailInput {...form.getInputProps('email')} />
            <PasswordInput {...form.getInputProps('password')} />
            <PasswordInput {...form.getInputProps('confirmPassword')} confirmPassword />
            <Button
              type="submit"
              disabled={!form.isValid()}
              loading={isSigningUp}
              fullWidth
              sx={styles.button}
            >
              Sign Up
            </Button>
          </Stack>
        </form>
        <Text component={Link} to="/login" variant="link" size="sm">
          Log In
        </Text>
      </Stack>
    </Center>
  );
};

const styles: CustomStyles = {
  page: {
    width: '100vw',
    height: '100vh',
  },
  container: {
    width: '80%',
    maxWidth: '500px',
    border: '1px solid lightgray',
    padding: '2rem',
  },
  button: {
    marginTop: '1.25rem',
  },
};
