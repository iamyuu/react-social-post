import { VStack } from '@chakra-ui/react';
import { PostItem } from './post-item';

/**
 * List post
 */
export function PostList() {
	return (
		<VStack mt={6} role='list' spacing={4}>
			{[...Array(5)].map((_, index) => (
				<PostItem
					key={index}
					body='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt deleniti atque, maxime necessitatibus sequi, quos vero porro tempora amet nisi repellat. Veniam temporibus vero quae similique neque, quisquam accusantium deleniti.'
					id={index}
					title='lorem ipsum'
				/>
			))}
		</VStack>
	);
}
