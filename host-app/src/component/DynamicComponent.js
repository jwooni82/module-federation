import React, { useState, useEffect } from 'react';
import { loadRemoteModule } from './loadRemoteModule';

const DynamicComponent = ({ path, port, name, onNavigate, hostStore }) => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      if (path) {
        try {
          const module = await loadRemoteModule(
            `http://localhost:${port}/remoteEntry.js`,
            name,
            './RemoteApp'
          );
          if (module && module.default) {
            setComponent(() => module.default);
          }
        } catch (error) {
          console.error(`Failed to load ${name}:`, error);
        }
      } else {
        setComponent(null);
      }
    };

    loadComponent();
  }, [path, port, name]);

  if (!Component) {
    return <div>Loading...</div>;
  }

  return <Component onNavigate={onNavigate} hostStore={hostStore} />;
};

export default DynamicComponent; 