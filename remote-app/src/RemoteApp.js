import React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import RemoteCounter from './RemoteCounter';
import BigComponent from './BigComponent';
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

const RemoteApp = ({ onNavigate, hostStore }) => {
  const defaultOnNavigate = { currentView: 'counter', setCurrentView: () => {} };
  const { currentView = 'counter', setCurrentView = () => {} } = onNavigate || defaultOnNavigate;

  return (
    <Provider store={remoteStore}>
      <div>
        <Nav>
          <button onClick={() => setCurrentView('counter')}>Counter</button>
          <button onClick={() => setCurrentView('big')}>Big Component</button>
        </Nav>
        {currentView === 'counter' && <RemoteCounter hostStore={hostStore} />}
        {currentView === 'big' && <BigComponent />}
      </div>
    </Provider>
  );
};

export default RemoteApp; 