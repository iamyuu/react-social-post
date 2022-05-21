import * as React from 'react';
import {
	useToast,
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { IconButton } from '~/components/ui';
import { FormInput, FormTextarea, ButtonSubmit } from '~/components/form';
import { editPost } from '../services/edit-post';

/**
 * Post edit button
 *
 * @param {{ post: import('../types').Post }} props
 */
export function PostEditButton(props) {
	const initialRef = React.useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isSubmitting, editPostMutation } = useEditPostMutation();

	/**
	 * @param {import('react').FormEvent<import('../types/form').PostFormElements>} event
	 */
	async function handleSave(event) {
		event.preventDefault();
		await editPostMutation(props.post.id, event.currentTarget.elements);
		onClose();
	}

	return (
		<>
			<IconButton icon={<EditIcon />} label='Edit post' onClick={onOpen} />

			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit post</ModalHeader>

					<form onSubmit={handleSave}>
						<ModalBody pb={6}>
							<FormInput defaultValue={props.post.title} isRequired name='title' placeholder='Title' ref={initialRef} />

							<FormTextarea defaultValue={props.post.body} isRequired name='body' placeholder="What's on your mind?" />
						</ModalBody>

						<ModalFooter>
							<Button mr={2} onClick={onClose}>
								Cancel
							</Button>

							<ButtonSubmit isLoading={isSubmitting}>{isSubmitting ? 'Saving' : 'Save'}</ButtonSubmit>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
}

/**
 * Custom hooks to edit post mutation
 */
function useEditPostMutation() {
	const [isSubmitting, setSubmitting] = React.useState(false);
	const toast = useToast({
		variant: 'subtle',
		isClosable: true,
	});

	/**
	 * @param {number} postId
	 * @param {import('./post-form-field').FormFields} formElements
	 */
	async function editPostMutation(postId, formElements) {
		setSubmitting(true);

		try {
			const { title, body } = formElements;

			await editPost({
				id: postId,
				title: title.value,
				body: body.value,
			});

			toast({ status: 'success', title: 'Success edit post' });
		} catch (error) {
			toast({ status: 'error', title: error.message || 'Something went wrong' });
		} finally {
			setSubmitting(false);
		}
	}

	return { isSubmitting, editPostMutation };
}
