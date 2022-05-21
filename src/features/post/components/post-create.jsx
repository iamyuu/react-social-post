import * as React from 'react';
import { useToast, VStack } from '@chakra-ui/react';
import { Card } from '~/components/ui';
import { FormInput, FormTextarea, ButtonSubmit } from '~/components/form';
import { createPost } from '../services/create-post';

/**
 * Create post form
 */
export function PostCreate() {
	const { isSubmitting, createPostMutation } = useCreatePostMutation();

	/**
	 * @param {import('react').FormEvent<import('../types/form').PostFormElements>} event
	 */
	async function handleSubmit(event) {
		event.preventDefault();
		await createPostMutation(event.currentTarget.elements);
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

/**
 * Custom hooks to create post mutation
 */
function useCreatePostMutation() {
	const [isSubmitting, setSubmitting] = React.useState(false);
	const toast = useToast({
		variant: 'subtle',
		isClosable: true,
	});

	/**
	 * @param {import('../types/form').FormFields} formElements
	 */
	async function createPostMutation(formElements) {
		setSubmitting(true);

		try {
			const { title, body } = formElements;

			await createPost({
				title: title.value,
				body: body.value,
			});

			toast({ status: 'success', title: 'Post created' });
		} catch (error) {
			toast({ status: 'error', title: error.message || 'Something went wrong' });
		} finally {
			setSubmitting(false);
		}
	}

	return { isSubmitting, createPostMutation };
}
