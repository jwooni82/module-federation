import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Table, Button } from 'antd';

const { loadRemoteModule } = require('./component/loadRemoteModule');

const App = () => {
  const [RemoteCounter, setRemoteCounter] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const module = await loadRemoteModule('http://localhost:3001/remoteEntry.js', 'remoteApp', './RemoteCounter');
        console.log("module = ", module);
        if (module && module.default) {
          setRemoteCounter(() => module.default);
        }
      } catch (error) {
        console.error('Failed to load RemoteCounter:', error);
      }
    };

    loadComponent();
  }, []);

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

  return (
    <Provider store={store}>
      <div style={{ padding: '20px' }}>
        <h1>Host Application</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <h2>Host App Table</h2>
          <Table dataSource={hostDataSource} columns={hostColumns} />
        </div>

        <div>
          <h2>Remote Component</h2>
          {RemoteCounter && <RemoteCounter />}
        </div>
      </div>
    </Provider>
  );
};

export default App;