import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'antd';
import styled from 'styled-components';

const StyledTable = styled(Table)`
  .ant-table {
    .ant-table-thead > tr > th {
      font-size: 18px;
      font-weight: bold;
      background-color: #ffa39e;
      color: #fff;
    }

    .ant-table-tbody > tr > td {
      font-size: 16px;
    }
  }
`;

const RemoteCounter = ({ hostStore }) => {
  const count = useSelector(state => state.count);
  const [hostCount, setHostCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hostStore) return;
    
    // 초기값 설정
    setHostCount(hostStore.getState().count);
    
    // store 변경 구독
    const unsubscribe = hostStore.subscribe(() => {
      setHostCount(hostStore.getState().count);
    });

    // cleanup
    return () => unsubscribe();
  }, [hostStore]);

  // 테이블 데이터
  const dataSource = [
    {
      key: '1',
      name: 'John Doe',
      age: 32,
      address: 'New York',
    },
    {
      key: '2',
      name: 'Jane Smith',
      age: 28,
      address: 'Los Angeles',
    },
    {
      key: '3',
      name: 'Bob Johnson',
      age: 45,
      address: 'Chicago',
    },
  ];

  // 테이블 컬럼 정의
  const columns = [
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
    <div style={{ border: '1px solid lightgray', padding: '20px', margin: '10px' }}>
      <h2>Remote Counter from Remote App</h2>
      <p>Remote Count: {count}</p>
      <p>Host Count: {hostCount}</p>
      <Button type="primary" onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</Button>
      <Button style={{ marginLeft: '10px' }} onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</Button>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Ant Design Table Example</h3>
        <StyledTable dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
};

export default RemoteCounter;