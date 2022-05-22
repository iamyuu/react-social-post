import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import rootSaga from './saga';

/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 */

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
	devTools: import.meta.env.DEV,
});

sagaMiddleware.run(rootSaga);

export default store;
