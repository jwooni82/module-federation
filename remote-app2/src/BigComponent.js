import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 4px;
`;

const BigComponent = () => {
  return (
    <Container>
      <h2>Big Component from Remote App 2</h2>
      <p>This is a big component loaded from remote app 2.</p>
    </Container>
  );
};

export default BigComponent;