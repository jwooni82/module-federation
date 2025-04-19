import React from 'react';
import { Table, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #52c41a !important;
    color: white !important;
  }
  
  .ant-table-tbody > tr:hover > td {
    background-color: #e6f7d9 !important;
  }
`;

const RemoteCounter = () => {
  console.log('RemoteCounter 렌더링');
  
  const count = useSelector(state => {
    console.log('state 변경 감지:', state);
    return state.count;
  });
  
  const dispatch = useDispatch();

  const handleIncrement = () => {
    console.log('Increment 버튼 클릭');
    dispatch(increment());
  };

  const handleDecrement = () => {
    console.log('Decrement 버튼 클릭');
    dispatch(decrement());
  };

  // 테이블 데이터
  const dataSource = [
    {
      key: '1',
      name: 'Remote User 1',
      age: 25,
      address: 'Seoul',
    },
    {
      key: '2',
      name: 'Remote User 2',
      age: 30,
      address: 'Busan',
    },
    {
      key: '3',
      name: 'Remote User 3',
      age: 35,
      address: 'Incheon',
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
      <p>Count: {count}</p>
      <Button type="primary" onClick={handleIncrement}>Increment</Button>
      <Button style={{ marginLeft: '10px' }} onClick={handleDecrement}>Decrement</Button>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Ant Design Table Example</h3>
        <StyledTable dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
};

export default RemoteCounter;