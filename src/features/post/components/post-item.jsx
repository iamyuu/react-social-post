import { Flex, Heading, Text, ButtonGroup } from '@chakra-ui/react';
import { Card } from '~/components/ui';
import { PostEditButton } from './post-edit-button';
import { PostDeleteButton } from './post-delete-button';

/**
 * Single post
 *
 * @param {import('../types').Post} props
 */
export function PostItem(props) {
	return (
		<Card as='article' role='listitem'>
			<Flex alignItems='center' as='header' justifyContent='space-between' mb={4}>
				<Heading fontWeight={600}>{props.title}</Heading>

				<ButtonGroup spacing={1}>
					<PostEditButton post={props} />
					<PostDeleteButton postId={props.id} />
				</ButtonGroup>
			</Flex>

			<Text>{props.body}</Text>
		</Card>
	);
}
