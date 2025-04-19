const initialState = {
  count: 0,
  remoteData: 'Remote App 2 Data'
};

export function remoteReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_DATA':
      return { ...state, remoteData: action.payload };
    default:
      return state;
  }
} 