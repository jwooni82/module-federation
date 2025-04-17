import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import counterReducer from './counter/reducer.js';
import { counterSaga } from './counter/saga.js';

const rootReducer = combineReducers({
  counter: counterReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(counterSaga);

export default store; 