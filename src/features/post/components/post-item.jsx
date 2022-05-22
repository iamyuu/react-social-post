import { Flex, Heading, Text, ButtonGroup } from '@chakra-ui/react';
import { Card } from '~/components/ui';
import { PostEditButton } from './post-edit-button';
import { PostDeleteButton } from './post-delete-button';

/**
 * Single post
 *
 * @param {{ post: import('../types').Post }} props
 */
export function PostItem(props) {
	return (
		<Card as='article' role='listitem' w='full'>
			<Flex alignItems='center' as='header' justifyContent='space-between' mb={2}>
				<Heading fontSize='2xl' fontWeight={600}>
					{props.post.title}
				</Heading>

				<ButtonGroup spacing={1}>
					<PostEditButton post={props.post} />
					<PostDeleteButton postId={props.post.id} />
				</ButtonGroup>
			</Flex>

			<Text>{props.post.body}</Text>
		</Card>
	);
}
