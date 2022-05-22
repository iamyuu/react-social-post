import { Box, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

/**
 * Post error state
 *
 * @param {{ message: string }} props
 */
export function PostError(props) {
	return (
		<Alert status='error'>
			<AlertIcon />
			<Box>
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>{props.message}</AlertDescription>
			</Box>
		</Alert>
	);
}
