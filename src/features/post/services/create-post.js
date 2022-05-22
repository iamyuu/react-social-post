import { http } from '~/utils/http';

/**
 * Create a new post
 *
 * @param {Omit<import('../types').Post, 'id'>} payload
 */
export async function createPost(payload) {
	return http(`/posts`, {
		data: {
			title: payload.title,
			body: payload.body,
		},
	});
}
