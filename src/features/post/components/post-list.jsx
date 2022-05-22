import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector, useDispatch } from 'react-redux';
import { VStack, Text } from '@chakra-ui/react';
import { selectPosts, selectStatus, fetchPostAsync, POST_LIMIT } from '../stores';
import { PostItem } from './post-item';
import { PostLoading } from './post-loading';
import { PostError } from './post-error';

const POST_LENGTH = 100;

/**
 * Message that display when the user has reached the last post
 */
function LastPost() {
	return <Text>You&apos;ve reached the last post</Text>;
}

/**
 * List post
 */
export function PostList() {
	const dispatch = useDispatch();
	const posts = useSelector(selectPosts);
	const [status, error] = useSelector(selectStatus);
	const [lastIndex, setLastIndex] = React.useState(0);
	const [lastRef, startingLoadMore] = useInView();

	const isPending = status === 'pending';
	const isFailure = status === 'failure';
	const isReachingEnd = lastIndex >= POST_LENGTH;

	React.useEffect(() => {
		if (startingLoadMore && !isReachingEnd) {
			setLastIndex(currentLastIndex => currentLastIndex + POST_LIMIT);
			dispatch(fetchPostAsync(lastIndex));
		}
	}, [startingLoadMore]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<VStack mt={6} role='list' spacing={4}>
			{posts.map(post => (
				<PostItem key={post.id} post={post} />
			))}

			{isPending && !isReachingEnd ? <PostLoading /> : null}
			{isFailure ? <PostError message={error} /> : null}
			{isReachingEnd ? <LastPost /> : null}

			<div ref={lastRef} />
		</VStack>
	);
}
