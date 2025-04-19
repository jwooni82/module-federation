import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Table, Button } from 'antd';

const { loadRemoteModule } = require('./component/loadRemoteModule');

const App = () => {
  const [RemoteApp, setRemoteApp] = useState(null);
  const [RemoteApp2, setRemoteApp2] = useState(null);

  useEffect(() => {
    const loadComponents = async () => {
      try {
        const [module1, module2] = await Promise.all([
          loadRemoteModule('http://localhost:3001/remoteEntry.js', 'remoteApp', './RemoteApp'),
          loadRemoteModule('http://localhost:3002/remoteEntry.js', 'remoteApp2', './RemoteApp')
        ]);
        
        if (module1 && module1.default) {
          setRemoteApp(() => module1.default);
        }
        if (module2 && module2.default) {
          setRemoteApp2(() => module2.default);
        }
      } catch (error) {
        console.error('Failed to load RemoteApps:', error);
      }
    };

    loadComponents();
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

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <h2>Remote App 1</h2>
            {RemoteApp && <RemoteApp />}
          </div>
          <div style={{ flex: 1 }}>
            <h2>Remote App 2</h2>
            {RemoteApp2 && <RemoteApp2 />}
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;