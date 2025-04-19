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
  return (
    <Provider store={remoteStore}>
      <div>
        <Nav>
          <button onClick={() => onNavigate.setCurrentView('counter')}>Counter</button>
          <button onClick={() => onNavigate.setCurrentView('big')}>Big Component</button>
        </Nav>
        {onNavigate.currentView === 'counter' && <RemoteCounter hostStore={hostStore} />}
        {onNavigate.currentView === 'big' && <BigComponent />}
      </div>
    </Provider>
  );
};

export default RemoteApp; 