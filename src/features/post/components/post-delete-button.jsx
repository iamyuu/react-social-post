import * as React from 'react';
import { useDispatch } from 'react-redux';
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
import { deletePostAsync } from '../store';

/**
 * Post delete button
 *
 * @param {{ postId: number }} props
 */
export function PostDeleteButton(props) {
	const dispatch = useDispatch();
	const cancelRef = React.useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isSubmitting, setSubmitting] = React.useState(false);
	const toast = useToast({ variant: 'subtle', isClosable: true });

	/**
	 * Handling click delete button
	 */
	async function handleDelete() {
		setSubmitting(true);

		dispatch(
			deletePostAsync({
				postId: props.postId,
				onSuccess: () => toast({ status: 'success', title: 'Post has been deleted' }),
				onError: message => toast({ status: 'error', title: message }),
				onFinally: () => {
					setSubmitting(false);
					onClose();
				},
			}),
		);
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
