import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RemoteCounter from './RemoteCounter';
import BigComponent from './BigComponent';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 20px;
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 20px;
  }
  
  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    
    &:hover {
      color: #1890ff;
    }
  }
`;

const RemoteApp = () => {
  return (
    <BrowserRouter>
      <div>
        <Nav>
          <ul>
            <li>
              <Link to="/">Remote Counter</Link>
            </li>
            <li>
              <Link to="/big">Big Component</Link>
            </li>
          </ul>
        </Nav>
        
        <Routes>
          <Route path="/" element={<RemoteCounter />} />
          <Route path="/big" element={<BigComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default RemoteApp; 