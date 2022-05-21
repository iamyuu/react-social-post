/* eslint-disable jsdoc/valid-types */
import { Tooltip, IconButton as ChakraIconButton } from '@chakra-ui/react';

/**
 * @param {object} props
 * @param {string} props.label
 * @param {import('@chakra-ui/react').IconButtonProps['size']} [props.size]
 * @param {import('@chakra-ui/react').IconButtonProps['icon']} props.icon
 * @param {import('@chakra-ui/react').IconButtonProps['onClick']} [props.onClick]
 */
export function IconButton(props) {
	return (
		<Tooltip label={props.label} placement='top'>
			<ChakraIconButton aria-label={props.label} size='sm' variant='ghost' {...props} />
		</Tooltip>
	);
}
