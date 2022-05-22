import { Flex, Spinner, Text } from '@chakra-ui/react';

/**
 * Post loading state
 */
export function PostLoading() {
	return (
		<Flex alignItems='center' aria-busy='true' aria-label='Loading post' flexDirection='column' justifyContent='center'>
			<Spinner color='blue.500' emptyColor='gray.200' size='xl' speed='0.65s' thickness='4px' />
			<Text mt={4}>Loading post...</Text>
		</Flex>
	);
}
