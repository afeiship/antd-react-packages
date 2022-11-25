import React from 'react';
import styled from 'styled-components';
import { AcBreadcrumb } from '../../src/main';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  const items3 = [
    { value: 's1', label: 'Status1' },
    { value: 's2', label: 'Status2' },
    { value: 's3', label: 'Status3' }
  ];

  return (
    <Container>
      <AcBreadcrumb items={items3} />
    </Container>
  );
};
