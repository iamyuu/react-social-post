import * as React from 'react';
import { useDispatch } from 'react-redux';
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
import { patchPostAsync } from '../store';

/**
 * Post edit button
 *
 * @param {{ post: import('../types').Post }} props
 */
export function PostEditButton(props) {
	const dispatch = useDispatch();
	const initialRef = React.useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isSubmitting, setSubmitting] = React.useState(false);
	const toast = useToast({ variant: 'subtle', isClosable: true });

	/**
	 * @param {import('react').FormEvent<import('../types/form').PostFormElements>} event
	 */
	async function handleSave(event) {
		event.preventDefault();
		setSubmitting(true);

		const { title, body } = event.currentTarget.elements;

		dispatch(
			patchPostAsync({
				formData: {
					id: props.post.id,
					title: title.value,
					body: body.value,
				},
				onSuccess: () => {
					toast({ status: 'success', title: 'Success edit post' });
					onClose();
				},
				onError: message => toast({ status: 'error', title: message }),
				onFinally: () => {
					setSubmitting(false);
				},
			}),
		);
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
