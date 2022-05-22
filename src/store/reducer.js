import { combineReducers } from '@reduxjs/toolkit';
import { postReducer } from '~/features/post';

/**
 * Root reducer
 */
export default combineReducers({
	post: postReducer,
});
