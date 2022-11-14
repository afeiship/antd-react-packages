import React from 'react';
import { AcSelect, AcCheckbox } from '../../src/main';
import styled from 'styled-components';
import * as tpls from '@jswork/antd-tpls';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  return (
    <Container>
      <AcSelect
        style={{ width: '100%' }}
        placeholder="Please select"
        items={['a', 'b', 'c']}
        template={tpls.selectRaw}
        onChange={(e) => {
          console.log('e: ', e);
        }}
      />
      <hr />
      <AcCheckbox
        onChange={(e) => {
          console.log('e checked: ', e);
        }}>
        I Agree
      </AcCheckbox>
    </Container>
  );
};
