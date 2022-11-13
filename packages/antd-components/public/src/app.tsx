import * as React from 'react';
import { AcSelect } from '../../src/main';
import styled from 'styled-components';
import { Select } from 'antd';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  return (
    <Container>
      <AcSelect />
      {/*<AcSelect*/}
      {/*  style={{ width: '100%' }}*/}
      {/*  items={['a', 'b', 'c']}*/}
      {/*  template={({ item, index }) => <Select.Option key={index}>{item}</Select.Option>}*/}
      {/*/>*/}
    </Container>
  );
};
