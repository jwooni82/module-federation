import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import RemoteCounter from './RemoteCounter';
import { remoteStore } from './store';

const Nav = styled.nav`
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;

  button {
    margin-right: 15px;
    background: none;
    border: none;
    color: #333;
    font-weight: 500;
    cursor: pointer;
    padding: 0;

    &:hover {
      color: #1890ff;
    }
  }
`;

const BigComponent = React.lazy(() => import('remoteApp2/BigComponent'));

const RemoteApp = ({ onNavigate = {}, hostStore }) => {
  const { currentView = 'counter', setCurrentView = () => {} } = onNavigate;

  return (
    <Provider store={remoteStore}>
      <div>
        <Nav>
          <button onClick={() => setCurrentView('counter')}>Counter</button>
          <button onClick={() => setCurrentView('big')}>Big Component</button>
        </Nav>
        {currentView === 'counter' && <RemoteCounter hostStore={hostStore} />}
        {currentView === 'big' && (
          <Suspense fallback={<div>Loading...</div>}>
            <BigComponent />
          </Suspense>
        )}
      </div>
    </Provider>
  );
};

export default RemoteApp; 