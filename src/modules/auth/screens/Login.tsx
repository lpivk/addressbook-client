import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Center, Stack, Group, Button, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

import { CustomStyles } from '@shared/types';
import { UsernameInput, PasswordInput } from '../components';
import { useLoginQuery } from '../api';
import { validationSchema, initialValues } from '../service/loginService';

export const Login = () => {
  const form = useForm({
    initialValues,
    validate: validationSchema,
    validateInputOnBlur: true,
  });

  const { loginQuery, isLoggingIn } = useLoginQuery();

  const handleSubmit = useCallback(
    () => form.onSubmit((values) => loginQuery(values)),
    [form.values]
  );

  return (
    <Center sx={styles.page}>
      <Stack spacing="lg" sx={styles.container}>
        <Text size="xl" weight={700}>
          Login
        </Text>
        <form onSubmit={handleSubmit()}>
          <Stack spacing="sm">
            <UsernameInput {...form.getInputProps('username')} />
            <PasswordInput {...form.getInputProps('password')} />
            <Button
              type="submit"
              disabled={!form.isValid()}
              loading={isLoggingIn}
              fullWidth
              sx={styles.button}
            >
              Log In
            </Button>
          </Stack>
        </form>
        <Group position="apart">
          <Text component={Link} to="/forgot-password" variant="link" size="sm">
            Forgot password?
          </Text>
          <Text component={Link} to="/signup" variant="link" size="sm">
            Sign Up
          </Text>
        </Group>
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
