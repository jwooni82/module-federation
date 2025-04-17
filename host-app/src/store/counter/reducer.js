import { INCREMENT, DECREMENT } from './actions';

const initialState = {
  count: 0
};

export default function counterReducer(state = initialState, action) {
  console.log('counterReducer 호출');
  console.log('현재 state:', state);
  console.log('action:', action);

  switch (action.type) {
    case INCREMENT:
      console.log('INCREMENT 액션 처리');
      return {
        ...state,
        count: state.count + 1
      };
    case DECREMENT:
      console.log('DECREMENT 액션 처리');
      return {
        ...state,
        count: state.count - 1
      };
    default:
      console.log('기본 액션 처리');
      return state;
  }
} 