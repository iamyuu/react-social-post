import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	resolve: {
		alias: {
			'~/': `${path.resolve(__dirname, 'src')}/`,
		},
	},

	plugins: [
		// https://github.com/vitejs/vite/tree/main/packages/plugin-react
		react(),
	],

	// https://vitest.dev/config
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: ['./src/tests/setup.js'],
	},
});
