import { http } from '~/utils/http';

/**
 * Delete post by post id
 *
 * @param {number} postId
 */
export async function deletePostById(postId) {
	return http(`/posts/${postId}`, { method: 'DELETE' });
}
