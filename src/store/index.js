import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';

/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 */

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer,
	devTools: import.meta.env.DEV,
	middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

export default store;
