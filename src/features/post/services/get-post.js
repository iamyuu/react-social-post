import { http } from '~/utils/http';

/**
 * Get single post
 *
 * @param {number} postId
 */
export async function getPostById(postId) {
	return http(`/posts/${postId}`);
}
