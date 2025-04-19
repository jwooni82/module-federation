import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import store from './store';
import { Table, Button } from 'antd';

const { loadRemoteModule } = require('./component/loadRemoteModule');

const AppContent = () => {
  const [RemoteApp, setRemoteApp] = useState(null);
  const [RemoteApp2, setRemoteApp2] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // RemoteApp1은 app1로 들어갈 때만 로드
  useEffect(() => {
    const loadRemoteApp = async () => {
      if (location.pathname.startsWith('/app1')) {
        try {
          const module = await loadRemoteModule('http://localhost:3001/remoteEntry.js', 'remoteApp', './RemoteApp');
          if (module && module.default) {
            setRemoteApp(() => module.default);
          }
        } catch (error) {
          console.error('Failed to load RemoteApp:', error);
        }
      }
    };

    loadRemoteApp();
  }, [location.pathname]);

  // RemoteApp2는 app2로 들어갈 때만 로드
  useEffect(() => {
    const loadRemoteApp2 = async () => {
      if (location.pathname.startsWith('/app2')) {
        try {
          const module = await loadRemoteModule('http://localhost:3002/remoteEntry.js', 'remoteApp2', './RemoteApp');
          if (module && module.default) {
            setRemoteApp2(() => module.default);
          }
        } catch (error) {
          console.error('Failed to load RemoteApp2:', error);
        }
      }
    };

    loadRemoteApp2();
  }, [location.pathname]);

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

  return (
    <div style={{ padding: '20px' }}>
      <h1>Host Application</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Host App Table</h2>
        <Table dataSource={hostDataSource} columns={hostColumns} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Link to="/app1/counter" style={{ marginRight: '10px' }}>
          <Button type={location.pathname.startsWith('/app1') ? 'primary' : 'default'}>Remote App 1</Button>
        </Link>
        <Link to="/app2/counter">
          <Button type={location.pathname.startsWith('/app2') ? 'primary' : 'default'}>Remote App 2</Button>
        </Link>
      </div>

      <div>
        <Routes>
          <Route 
            path="/app1/*" 
            element={RemoteApp && (
              <RemoteApp 
                onNavigate={{
                  currentView: getCurrentView(),
                  setCurrentView: handleRemoteNavigate
                }} 
              />
            )} 
          />
          <Route 
            path="/app2/*" 
            element={RemoteApp2 && (
              <RemoteApp2 
                onNavigate={{
                  currentView: getCurrentView(),
                  setCurrentView: handleRemoteNavigate
                }} 
              />
            )} 
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