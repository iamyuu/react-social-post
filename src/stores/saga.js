import { all } from 'redux-saga/effects';
import { postSaga } from '~/features/post';

/**
 * Root saga
 */
export default function* rootSaga() {
	yield all([postSaga()]);
}
