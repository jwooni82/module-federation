import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from 'hostApp/store';
const RemoteCounter = lazy(() => import('./RemoteCounter'));
const BigComponent = lazy(() => import('./BigComponent'));

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);