import React from 'react';
import RemoteCounter from './RemoteCounter';
import BigComponent from './BigComponent';
import styled from 'styled-components';

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

const RemoteApp = ({ onNavigate }) => {
  return (
    <div>
      <Nav>
        <button onClick={() => onNavigate('counter')}>Counter</button>
        <button onClick={() => onNavigate('big')}>Big Component</button>
      </Nav>
      <div>
        {onNavigate.currentView === 'counter' && <RemoteCounter />}
        {onNavigate.currentView === 'big' && <BigComponent />}
      </div>
    </div>
  );
};

export default RemoteApp; 