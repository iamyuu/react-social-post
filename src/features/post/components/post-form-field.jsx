import { FormInput, FormTextarea } from '~/components/form';

/**
 * @typedef {{ title: HTMLInputElement, body: HTMLInputElement }} FormFields
 * @typedef {HTMLFormControlsCollection & FormFields} FormElements
 * @typedef {HTMLFormElement & { elements: FormElements }} FormPostElements
 */

/**
 * Form field for post form
 */
export function PostFormField() {
	return (
		<>
			<FormInput isRequired name='title' placeholder='Title' />

			<FormTextarea isRequired name='body' placeholder="What's on your mind?" />
		</>
	);
}
