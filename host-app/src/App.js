import React, { useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
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

const AppContent = () => {
  const [RemoteApp, setRemoteApp] = useState(null);
  const [RemoteApp2, setRemoteApp2] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const hostCount = useSelector(state => state.count);
  const dispatch = useDispatch();

  const handleRemoteNavigate = (view) => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/app1')) {
      navigate(`/app1/${view}`);
    } else if (currentPath.startsWith('/app2')) {
      navigate(`/app2/${view}`);
    }
  };

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

  const getCurrentView = () => {
    const path = location.pathname;
    if (path.endsWith('/big')) return 'big';
    return 'counter';
  };

  const onNavigate = {
    currentView: getCurrentView(),
    setCurrentView: handleRemoteNavigate
  };

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
        <Link to="/app1/counter" style={{ marginRight: '10px' }}>
          <Button type={location.pathname.startsWith('/app1') ? 'primary' : 'default'}>Remote App 1</Button>
        </Link>
        <Link to="/app2/counter" style={{ marginRight: '10px' }}>
          <Button type={location.pathname.startsWith('/app2') ? 'primary' : 'default'}>Remote App 2</Button>
        </Link>
      </div>

      <div>
        <Routes>
          <Route 
            path="/app1/*" 
            element={
              <DynamicComponent
                path={location.pathname}
                port={3001}
                name="remoteApp"
                //onLoaded={setRemoteApp}
                onNavigate={onNavigate}
                hostStore={store}
              />
            }
          />
          <Route 
            path="/app2/*" 
            element={
              <DynamicComponent
                path={location.pathname}
                port={3002}
                name="remoteApp2"
                //onLoaded={setRemoteApp2}
                onNavigate={onNavigate}
                hostStore={store}
              />
            }
          />
          <Route path="/" element={<div>Select a remote app</div>} />
        </Routes>
      </div>
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