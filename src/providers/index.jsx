import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '~/theme';
import store from '~/stores';

/**
 * @param {object} props
 * @param {import('react').ReactNode}  props.children
 */
export default function AppProviders({ children }) {
	return (
		<ReduxProvider store={store}>
			<ChakraProvider theme={theme}>{children}</ChakraProvider>
		</ReduxProvider>
	);
}
