import React, { Suspense } from 'react';

const RemoteComponent = React.lazy(() => import('remote_app/RemoteComponent'));

function App() {
  return (
    <div>
      <h1>🏠 Host App</h1>
      <Suspense fallback={<p>Loading remote component...</p>}>
        <RemoteComponent />
      </Suspense>
    </div>
  );
}

export default App;