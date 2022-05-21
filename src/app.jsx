import { Container } from '@chakra-ui/react';
import { PostCreate, PostList } from '~/features/post';

/**
 * The applications
 */
export default function App() {
	return (
		<Container maxW='container.lg' my={6}>
			<PostCreate />
			<PostList />
		</Container>
	);
}
