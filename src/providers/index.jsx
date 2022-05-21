import { ChakraProvider } from '@chakra-ui/react';
import theme from '~/theme';

/**
 * @param {object} props
 * @param {import('react').ReactNode}  props.children
 */
export default function AppProviders({ children }) {
	return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
