import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Center, Stack, Button, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

import { CustomStyles } from '@shared/types';
import { EmailInput } from '../components';
import { useForgotPasswordQuery } from '../api';
import { validationSchema, initialValues } from '../service/forgotPasswordService';

export const ForgotPassword = () => {
  const form = useForm({
    initialValues,
    validate: validationSchema,
    validateInputOnBlur: true,
  });

  const { forgotPasswordQuery, isLoading } = useForgotPasswordQuery();

  const handleSubmit = useCallback(
    () => form.onSubmit((values) => forgotPasswordQuery(values)),
    [form.values]
  );

  return (
    <Center sx={styles.page}>
      <Stack spacing="lg" sx={styles.container}>
        <Text size="xl" weight={700}>
          Forgot password?
        </Text>
        <Text size="sm">
          Enter your e-mail and we will send you instructions for resetting the password.
        </Text>
        <form onSubmit={handleSubmit()}>
          <Stack spacing="sm">
            <EmailInput {...form.getInputProps('email')} />
            <Button
              type="submit"
              disabled={!form.isValid()}
              loading={isLoading}
              fullWidth
              sx={styles.button}
            >
              Send E-mail
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
