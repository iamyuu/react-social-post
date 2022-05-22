import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useToast, VStack } from '@chakra-ui/react';
import { Card } from '~/components/ui';
import { FormInput, FormTextarea, ButtonSubmit } from '~/components/form';
import { createPostAsync } from '../stores';

/**
 * Create post form
 */
export function PostCreate() {
	const dispatch = useDispatch();
	const [isSubmitting, setSubmitting] = React.useState(false);
	const toast = useToast({ variant: 'subtle', isClosable: true });

	/**
	 * @param {import('react').FormEvent<import('../types/form').PostFormElements>} event
	 */
	async function handleSubmit(event) {
		event.preventDefault();
		setSubmitting(true);

		const { title, body } = event.currentTarget.elements;

		dispatch(
			createPostAsync({
				formData: {
					title: title.value,
					body: body.value,
				},
				onSuccess: () => toast({ status: 'success', title: 'Post created' }),
				onError: message => toast({ status: 'error', title: message }),
				onFinally: () => {
					// @ts-ignore
					event.target.reset();
					setSubmitting(false);
				},
			}),
		);
	}

	return (
		<Card>
			<VStack
				as='form'
				// @ts-expect-error -- I think because use js file, so chakra don't know
				onSubmit={handleSubmit}
				spacing={4}
			>
				<FormInput isRequired name='title' placeholder='Title' />

				<FormTextarea isRequired name='body' placeholder="What's on your mind?" />

				<ButtonSubmit isLoading={isSubmitting} w='full'>
					{isSubmitting ? 'Posting' : 'Post'}
				</ButtonSubmit>
			</VStack>
		</Card>
	);
}
