import { call, all, put, takeEvery } from 'redux-saga/effects';
import * as postServices from '../services';
import * as postActions from './post-actions';
import { postFetchRoutine, addPost, updatePost, deletePost } from './post-slice';

export const POST_LIMIT = 10;

/**
 * @param {ReturnType<typeof postActions.fetchPostAsync>} action
 */
function* fetchPostSaga({ payload }) {
	try {
		yield put(postFetchRoutine.trigger());

		// TODO: use `fork` to run parallel
		const postTasks = [...Array(POST_LIMIT)].map((_, index) =>
			call(postServices.getPostById, index + 1 + payload.lastIndex),
		);
		const posts = yield all(postTasks);

		yield put(postFetchRoutine.success(posts));
	} catch (error) {
		yield put(postFetchRoutine.failure(error.message));
	} finally {
		yield put(postFetchRoutine.fulfill());
	}
}

/**
 * @param {ReturnType<typeof postActions.createPostAsync>} action
 */
function* createPostSaga({ payload }) {
	try {
		const newPost = yield call(postServices.createPost, payload);
		yield put(addPost(newPost));

		payload.onSuccess?.();
	} catch (error) {
		payload.onError?.(error.message || 'Something went wrong');
	} finally {
		payload.onFinally?.();
	}
}

/**
 * @param {ReturnType<typeof postActions.patchPostAsync>} action
 */
function* editPostSaga({ payload }) {
	try {
		yield call(postServices.editPost, payload);
		yield put(updatePost(payload));

		payload.onSuccess?.();
	} catch (error) {
		payload.onError?.(error.message || 'Something went wrong');
	} finally {
		payload.onFinally?.();
	}
}

/**
 * @param {ReturnType<typeof postActions.deletePostAsync>} action
 */
function* deletePostSaga({ payload }) {
	try {
		yield call(postServices.deletePostById, payload.postId);
		yield put(deletePost(payload.postId));

		payload.onSuccess?.();
	} catch (error) {
		payload.onError?.(error.message || 'Something went wrong');
	} finally {
		payload.onFinally?.();
	}
}

/**
 * Post saga
 */
export function* postSaga() {
	yield takeEvery(postActions.fetchPostAsync, fetchPostSaga);
	yield takeEvery(postActions.createPostAsync, createPostSaga);
	yield takeEvery(postActions.patchPostAsync, editPostSaga);
	yield takeEvery(postActions.deletePostAsync, deletePostSaga);
}
