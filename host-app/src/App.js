import React, { useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Table, Button } from 'antd';
import styled from 'styled-components';
import store from './store';
import DynamicComponent from './component/DynamicComponent';

const StyledTable = styled(Table)`
  .ant-table {
    .ant-table-thead > tr > th {
      font-size: 18px;
      font-weight: bold;
      background-color: #1890ff;
      color: #fff;
    }

    .ant-table-tbody > tr > td {
      font-size: 16px;
    }
  }
`;

const RemoteApp = () => {
  const { appName } = useParams();
  const [currentView, setCurrentView] = useState('counter');
  const navigate = useNavigate();

  const handleRemoteNavigate = (view) => {
    setCurrentView(view);
    navigate(`/${appName}/${view}`);
  };

  const getRemoteAppConfig = () => {
    if (appName === 'remoteApp') {
      return { port: 3001, name: 'remoteApp' };
    } else if (appName === 'remoteApp2') {
      return { port: 3002, name: 'remoteApp2' };
    }
    return null;
  };

  const config = getRemoteAppConfig();
  if (!config) return <div>Select a remote app</div>;

  return (
    <DynamicComponent
      path={`/${appName}`}
      port={config.port}
      name={config.name}
      onNavigate={{ currentView, setCurrentView: handleRemoteNavigate }}
      hostStore={store}
    />
  );
};

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hostCount = useSelector(state => state.count);
  const dispatch = useDispatch();

  // host-app의 테이블 데이터
  const hostDataSource = [
    {
      key: '1',
      name: 'Host User 1',
      age: 25,
      address: 'Seoul',
    },
    {
      key: '2',
      name: 'Host User 2',
      age: 30,
      address: 'Busan',
    },
    {
      key: '3',
      name: 'Host User 3',
      age: 35,
      address: 'Incheon',
    },
  ];

  // host-app의 테이블 컬럼 정의
  const hostColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const isRemoteApp = location.pathname.startsWith('/remoteApp/');
  const isRemoteApp2 = location.pathname.startsWith('/remoteApp2/');

  return (
    <div style={{ padding: '20px' }}>
      <h1>Host Application</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Host Counter: {hostCount}</h2>
        <Button type="primary" onClick={() => dispatch({ type: 'INCREMENT_HOST' })}>
          Increase Host Counter
        </Button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Host App Table</h2>
        <StyledTable dataSource={hostDataSource} columns={hostColumns} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Button 
          type={isRemoteApp ? 'primary' : 'default'}
          onClick={() => navigate('/remoteApp/counter')}
        >
          Remote App
        </Button>
        <Button 
          type={isRemoteApp2 ? 'primary' : 'default'}
          onClick={() => navigate('/remoteApp2/counter')}
        >
          Remote App 2
        </Button>
      </div>

      <Routes>
        <Route path="/:appName/*" element={<RemoteApp />} />
        <Route path="/" element={<div>Select a remote app</div>} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;