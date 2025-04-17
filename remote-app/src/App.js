//import { CounterProvider } from 'hostApp/context';
import React, { lazy, Suspense } from 'react';
const RemoteCounter = lazy(() => import('./RemoteCounter'));
const BigComponent = lazy(() => import('./BigComponent'));
import store from 'hostApp/store';
import { Provider } from 'react-redux'; 
const App = () => (
  <Provider store={store}>
  <div>
    <Suspense fallback={<div>Loading Remote Counter...</div>}>
        <h1>Remote App</h1>
        <Suspense fallback={<div>Loading Remote Counter...</div>}>
        <RemoteCounter />
        </Suspense>
        <Suspense fallback={<div>Loading Big Component...</div>}>
        <BigComponent />
        </Suspense>
    </Suspense>
  </div>
  </Provider>
);

export default App;