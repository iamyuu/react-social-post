import { extendTheme } from '@chakra-ui/react';

const styles = {
	// https://chakra-ui.com/docs/styled-system/features/global-styles
	global: {
		body: {
			bg: 'gray.100',
			color: 'gray.800',
		},
	},
};

const components = {
	Input: {
		defaultProps: {
			variant: 'flushed',
		},
	},
	Textarea: {
		defaultProps: {
			variant: 'flushed',
		},
	},
};

export default extendTheme({
	styles,
	components,
});
