import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const RemoteCounter = () => {
  console.log('RemoteCounter 렌더링');
  
  const count = useSelector(state => {
    console.log('state 변경 감지:', state);
    return state.counter.count;
  });
  
  const dispatch = useDispatch();

  const handleIncrement = () => {
    console.log('Increment 버튼 클릭');
    dispatch(increment());
  };

  const handleDecrement = () => {
    console.log('Decrement 버튼 클릭');
    dispatch(decrement());
  };

  return (
    <div style={{ border: '1px solid lightgray', padding: '20px', margin: '10px' }}>
      <h2>Remote Counter from Remote App</h2>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default React.memo(RemoteCounter);