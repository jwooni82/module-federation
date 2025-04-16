import React, { Suspense, lazy } from 'react';
import { CounterProvider } from './context';
const RemoteCounter = lazy(() => import('remoteApp/RemoteCounter'));
const RemoteBigComponent = lazy(() => import('remoteApp/BigComponent'));

const App = () => (
  <CounterProvider>
    <h1>Host Application</h1>
    <Suspense fallback={<div>Loading Remote Counter...</div>}>
      <RemoteCounter />
    </Suspense>
    <Suspense fallback={<div>Loading Remote Big Component...</div>}>
      <RemoteBigComponent />
    </Suspense>
  </CounterProvider>
);

export default App;