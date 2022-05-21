import * as React from 'react';
import { FormControl, FormErrorMessage, Textarea } from '@chakra-ui/react';

/**
 * Form textarea
 */
export const FormTextarea = React.forwardRef(
	/**
	 * @param {import('@chakra-ui/react').TextareaProps} props
	 * @param {import('react').ForwardedRef<HTMLTextAreaElement>} ref
	 */
	function FormTextarea(props, ref) {
		const [error, setError] = React.useState('');

		/**
		 * @param {import('react').FocusEvent<HTMLTextAreaElement>} event
		 */
		function handleValidate(event) {
			setError(event.target.validity.valid ? '' : event.target.validationMessage);
		}

		return (
			<FormControl isInvalid={!!error}>
				<Textarea onBlur={handleValidate} ref={ref} rows={5} {...props} />
				<FormErrorMessage>{error}</FormErrorMessage>
			</FormControl>
		);
	},
);
