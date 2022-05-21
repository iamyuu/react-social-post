import { render as rtlRender, screen, waitForElementToBeRemoved } from '@testing-library/react';
import AppProviders from '~/providers';

export * from '@testing-library/react';

/**
 * Override rtl render to add default wrapper
 *
 * @param {import('react').ReactElement} ui
 * @param {import('@testing-library/react').RenderOptions} [options]
 */
export function render(ui, options) {
	return rtlRender(ui, { wrapper: AppProviders, ...options });
}

/**
 * Utils for waiting loading to finish
 */
export function waitForLoadingToFinish() {
	return waitForElementToBeRemoved(
		() => [...screen.queryAllByLabelText(/loading/i), ...screen.queryAllByText(/loading/i)],
		{
			timeout: 4000,
		},
	);
}
