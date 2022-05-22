import { createAction } from '@reduxjs/toolkit';
import { POST_STORE_NAME } from './post-slice';

/**
 * @typedef {import('../types').Post} Post
 * @typedef {(message: string) => void} OnError
 * @typedef {Function} OnSuccess
 * @typedef {Function} OnFinally
 */

export const fetchPostAsync = createAction(
	`${POST_STORE_NAME}/fetchPostAsync`,

	/**
	 * @param {number} lastIndex
	 */
	lastIndex => ({
		payload: {
			lastIndex,
		},
	}),
);

export const createPostAsync = createAction(
	`${POST_STORE_NAME}/addPostAsync`,

	/**
	 * @param {object} payload
	 * @param {Omit<Post, 'id'>} payload.formData
	 * @param {OnSuccess} [payload.onSuccess]
	 * @param {OnError} [payload.onError]
	 * @param {OnFinally} [payload.onFinally]
	 */
	({ formData, onSuccess, onError, onFinally }) => ({
		payload: {
			onFinally,
			onSuccess,
			onError,
			title: formData.title,
			body: formData.body,
		},
	}),
);

export const patchPostAsync = createAction(
	`${POST_STORE_NAME}/patchPostAsync`,

	/**
	 * @param {object} payload
	 * @param {Post} payload.formData
	 * @param {OnSuccess} [payload.onSuccess]
	 * @param {OnError} [payload.onError]
	 * @param {OnFinally} [payload.onFinally]
	 */
	({ formData, onSuccess, onError, onFinally }) => ({
		payload: {
			onFinally,
			onSuccess,
			onError,
			id: formData.id,
			title: formData.title,
			body: formData.body,
		},
	}),
);

export const deletePostAsync = createAction(
	`${POST_STORE_NAME}/deletePostAsync`,

	/**
	 * @param {object} payload
	 * @param {Post['id']} payload.postId
	 * @param {OnSuccess} [payload.onSuccess]
	 * @param {OnError} [payload.onError]
	 * @param {OnFinally} [payload.onFinally]
	 */
	({ postId, onSuccess, onError, onFinally }) => ({
		payload: {
			onFinally,
			onSuccess,
			onError,
			postId,
		},
	}),
);
