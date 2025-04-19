import { createStore } from 'redux';
import { remoteReducer } from './reducer';

export const remoteStore = createStore(remoteReducer); 