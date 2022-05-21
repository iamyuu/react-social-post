import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppProviders from '~/providers';
import App from './app';

const RootApp = (
	<StrictMode>
		<AppProviders>
			<App />
		</AppProviders>
	</StrictMode>
);

createRoot(document.getElementById('root')).render(RootApp);
