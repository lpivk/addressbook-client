import { Field, FieldInputProps, FormikProps } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import _ from 'lodash';

import { Styles } from '../types';

interface TextInputProps {
  name: string;
  label: string;
  isRequired: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  isRequired,
}) => {
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
            isRequired={isRequired}
            isInvalid={
              !!_.get(form, `errors.${name}`) &&
              !!_.get(form, `touched.${name}`)
            }
            sx={styles.formControl}
          >
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input {...field} id={name} placeholder='Enter here' />
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
