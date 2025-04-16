import React from 'react';
//import { useCounter } from 'hostApp/context';

const RemoteCounter = () => {
  const { count, increment, decrement } = {};//useCounter();

  return (
    <div style={{ border: '1px solid lightgray', padding: '20px', margin: '10px' }}>
      <h2>Remote Counter from Remote App</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default RemoteCounter;