const initialState = {
  count: 0,
  hostData: 'Host App Data'
};

export function hostReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT_HOST':
      return { ...state, count: state.count + 1 };
    case 'SET_HOST_DATA':
      return { ...state, hostData: action.payload };
    default:
      return state;
  }
} 