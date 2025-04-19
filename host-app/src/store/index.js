import { createStore } from 'redux';
import { hostReducer } from './reducer';

const store = createStore(hostReducer);

// remote-app에서 접근할 수 있도록 store를 export
export const getHostStore = () => store;
export default store; 