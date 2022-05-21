import { combineReducers } from '@reduxjs/toolkit';
import { postReducer } from '~/features/post';

export default combineReducers({
	post: postReducer,
});
