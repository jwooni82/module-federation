import React, { createContext, useState, useContext } from 'react';

const CounterContext = createContext(null);

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  const value = {
    count,
    increment: () => setCount(count + 1),
    decrement: () => setCount(count - 1),
  };

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

export const useCounter = () => useContext(CounterContext);