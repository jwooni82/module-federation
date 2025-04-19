import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
const { loadRemoteModule } = require('./component/loadRemoteModule');

const App = () => {
  const [RemoteCounter, setRemoteCounter] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const module = await loadRemoteModule('http://localhost:3001/remoteEntry.js', 'remoteApp', './RemoteCounter');
        console.log("module = ", module);
        if (module && module.default) {
          setRemoteCounter(() => module.default);
        }
      } catch (error) {
        console.error('Failed to load RemoteCounter:', error);
      }
    };

    loadComponent();
  }, []);

  return (
    <Provider store={store}>
      <h1>Host Application</h1>
      {RemoteCounter && <RemoteCounter />}
    </Provider>
  );
};

export default App;