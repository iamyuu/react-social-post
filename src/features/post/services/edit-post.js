import { http } from '~/utils/http';

/**
 * Edit post by post id
 *
 * @param {import('../types').Post} payload
 */
export async function editPost(payload) {
	return http(`/posts/${payload.id}`, {
		method: 'PATCH',
		data: {
			title: payload.title,
			body: payload.body,
		},
	});
}
