import { takeEvery } from 'redux-saga/effects';
import { INCREMENT, DECREMENT } from './actions';

function* handleIncrement() {
  console.log('Incrementing...');
}

function* handleDecrement() {
  console.log('Decrementing...');
}

export function* counterSaga() {
  yield takeEvery(INCREMENT, handleIncrement);
  yield takeEvery(DECREMENT, handleDecrement);
} 