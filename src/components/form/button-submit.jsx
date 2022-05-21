import { Button } from '@chakra-ui/react';

/**
 * Form button submit
 *
 * @param {Omit<import('@chakra-ui/react').ButtonProps, 'type'>} props
 */
export function ButtonSubmit(props) {
	return <Button colorScheme='blue' type='submit' {...props} />;
}
