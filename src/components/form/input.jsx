import * as React from 'react';
import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';

/**
 * Form input
 */
export const FormInput = React.forwardRef(
	/**
	 * @param {import('@chakra-ui/react').InputProps} props
	 * @param {import('react').ForwardedRef<HTMLInputElement>} ref
	 */
	function FormInput(props, ref) {
		const [error, setError] = React.useState('');

		/**
		 * @param {import('react').FocusEvent<HTMLInputElement>} event
		 */
		function handleValidate(event) {
			setError(event.target.validity.valid ? '' : event.target.validationMessage);
		}

		return (
			<FormControl isInvalid={!!error}>
				<Input onBlur={handleValidate} ref={ref} {...props} />
				<FormErrorMessage>{error}</FormErrorMessage>
			</FormControl>
		);
	},
);
