import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

const RemoteCounter = lazy(() => import('./RemoteCounter'));
const BigComponent = lazy(() => import('./BigComponent'));

const App = () => (
  <div>
    <h1>Remote App</h1>
    <Suspense fallback={<div>Loading Remote Counter...</div>}>
      <RemoteCounter />
    </Suspense>
    <Suspense fallback={<div>Loading Big Component...</div>}>
      <BigComponent />
    </Suspense>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);