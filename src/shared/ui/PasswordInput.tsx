import { useState } from 'react';
import { Field, FieldInputProps, FormikProps } from 'formik';
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  FormErrorMessage,
} from '@chakra-ui/react';
import _ from 'lodash';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import { Styles } from '../types';

interface PasswordInputProps {
  name: string;
  label: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  label,
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Field name={name}>
      {({
        field,
        form,
      }: {
        field: FieldInputProps<string>;
        form: FormikProps<string>;
      }) => {
        return (
          <FormControl
            isRequired
            isInvalid={
              !!_.get(form, `errors.${name}`) &&
              !!_.get(form, `touched.${name}`)
            }
            sx={styles.formControl}
          >
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <InputGroup>
              <Input
                {...field}
                type={show ? 'text' : 'password'}
                id={name}
                placeholder='Enter here'
              />
              <InputRightElement>
                {show ? (
                  <Icon as={IoEyeOffOutline} onClick={handleClick} />
                ) : (
                  <Icon as={IoEyeOutline} onClick={handleClick} />
                )}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{_.get(form, `errors.${name}`)}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

const styles: Styles = {
  formControl: {
    height: '120px',
  },
};
