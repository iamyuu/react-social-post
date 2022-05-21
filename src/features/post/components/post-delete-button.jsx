import * as React from 'react';
import {
	useToast,
	useDisclosure,
	Button,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '~/components/ui';
import { deletePostById } from '../services/delete-post';

/**
 * Post delete button
 *
 * @param {{ postId: number }} props
 */
export function PostDeleteButton(props) {
	const cancelRef = React.useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isSubmitting, deletePostMutation } = useDeletePostMutation();

	/**
	 * Handling click delete button
	 */
	async function handleDelete() {
		await deletePostMutation(props.postId);
		onClose();
	}

	return (
		<>
			<IconButton icon={<DeleteIcon />} label='Delete post' onClick={onOpen} />

			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete Post
						</AlertDialogHeader>

						<AlertDialogBody>Are you sure? You can&apos;t undo this action afterwards.</AlertDialogBody>

						<AlertDialogFooter>
							<Button mr={2} onClick={onClose} ref={cancelRef}>
								Cancel
							</Button>

							<Button colorScheme='red' isLoading={isSubmitting} onClick={handleDelete}>
								{isSubmitting ? 'Deleting' : 'Delete'}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}

/**
 * Custom hooks to delete post mutation
 */
function useDeletePostMutation() {
	const [isSubmitting, setSubmitting] = React.useState(false);
	const toast = useToast({
		variant: 'subtle',
		isClosable: true,
	});

	/**
	 * @param {number} postId
	 */
	async function deletePostMutation(postId) {
		setSubmitting(true);

		try {
			await deletePostById(postId);

			toast({ status: 'success', title: 'Post has been deleted' });
		} catch (error) {
			toast({ status: 'error', title: error.message || 'Something went wrong' });
		} finally {
			setSubmitting(false);
		}
	}

	return { isSubmitting, deletePostMutation };
}
