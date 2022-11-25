import React from 'react';
import styled from 'styled-components';
import { AcBreadcrumb } from '../../src/main';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  const items1 = [
    { value: 'v1', label: 'l1' },
    { value: 'v2', label: 'l2' },
    { value: 'v3', label: 'l3' }
  ];

  // generate v1 - v9
  const items2 = [
    { value: 'v1', label: 'content1', key: 'k1', chosen: false },
    { value: 'v2', label: 'content2', key: 'k2', chosen: true },
    { value: 'v3', label: 'content3', key: 'k3', chosen: false },
    { value: 'v4', label: 'content4', key: 'k4', chosen: false },
    { value: 'v5', label: 'content5', key: 'k5', chosen: false },
    { value: 'v6', label: 'content6', key: 'k6', chosen: false },
    { value: 'v7', label: 'content7', key: 'k7', chosen: false }
  ];

  const items3 = [
    { value: 's1', label: 'Status1' },
    { value: 's2', label: 'Status2' },
    { value: 's3', label: 'Status3' }
  ] as any[];

  return (
    <Container>
      <AcBreadcrumb items={items3} />
    </Container>
  );
};
