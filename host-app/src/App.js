import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import store from './store';
const RemoteCounter = lazy(() => import('remoteApp/RemoteCounter'));
const RemoteBigComponent = lazy(() => import('remoteApp/BigComponent'));

const App = () => (
  <Provider store={store}>
    <h1>Host Application</h1>
    <Suspense fallback={<div>Loading Remote Counter...</div>}>
      <RemoteCounter />
    </Suspense>
    <Suspense fallback={<div>Loading Remote Big Component...</div>}>
      <RemoteBigComponent />
    </Suspense>
  </Provider>
);

export default App;