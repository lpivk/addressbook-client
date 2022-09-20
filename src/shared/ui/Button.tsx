import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

interface ButtonProps extends ChakraButtonProps {
  label: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ChakraButton colorScheme='teal' w={'100%'} {...props}>
      {props.label}
    </ChakraButton>
  );
};
