import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { createRoutine } from 'redux-saga-routines';

/**
 * @typedef {'idle' | 'pending' | 'success' | 'failure'} Status
 */

export const POST_STORE_NAME = 'post';
export const postFetchRoutine = createRoutine(POST_STORE_NAME);

/** @type {import('@reduxjs/toolkit').EntityAdapter<import('../types').Post>} */
const postEntity = createEntityAdapter({
	selectId: post => post.id,
});

const initialState = postEntity.getInitialState({
	/** @type {Status} */
	status: 'idle',
	error: '',
});

const postSlice = createSlice({
	name: POST_STORE_NAME,
	initialState,
	reducers: {
		addPost: postEntity.addOne,
		deletePost: postEntity.removeOne,

		/**
		 * @param {initialState} state
		 * @param {import('@reduxjs/toolkit').PayloadAction<import('../types').Post>} action
		 */
		updatePost: (state, { payload }) => {
			postEntity.updateOne(state, { id: payload.id, changes: payload });
		},
	},
	extraReducers: {
		/**
		 * @param {initialState} state
		 */
		[postFetchRoutine.TRIGGER]: state => {
			state.status = 'pending';
		},

		/**
		 * @param {initialState} state
		 */
		[postFetchRoutine.FULFILL]: state => {
			state.status = 'idle';
		},

		/**
		 * @param {initialState} state
		 * @param {import('@reduxjs/toolkit').PayloadAction<import('../types').Post[]>} action
		 */
		[postFetchRoutine.SUCCESS]: (state, { payload }) => {
			state.status = 'success';
			postEntity.addMany(state, payload);
		},

		/**
		 * @param {initialState} state
		 * @param {import('@reduxjs/toolkit').PayloadAction<string>} action
		 */
		[postFetchRoutine.FAILURE]: (state, { payload }) => {
			state.status = 'failure';
			state.error = payload;
		},
	},
});

export const { selectAll: selectPosts } = postEntity.getSelectors(state => state.post);

/** @type {(state: import('~/store').RootState) => [Status, string]} */
export const selectStatus = state => [state.post.status, state.post.error];

export const { addPost, updatePost, deletePost } = postSlice.actions;

export const postReducer = postSlice.reducer;
