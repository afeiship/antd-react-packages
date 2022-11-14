import React from 'react';
import styled from 'styled-components';
import * as tpls from '@jswork/antd-tpls';
import {
  AcSelect,
  AcCheckbox,
  AcCheckboxGroup,
  AcInput,
  AcInputNumber,
  AcRadioGroup
} from '../../src/main';

console.log('tpls: ', tpls);

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

  return (
    <Container>
      <AcRadioGroup items={items1} />
      <AcRadioGroup
        items={items1}
        template={tpls.radioKv}
        templateOptions={{ isButton: true }}
        buttonStyle={'solid'}
      />
      <hr />
      <AcInputNumber onChange={(e) => console.log(e)} />
      <hr />
      <AcInput />
      <hr />
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
      <hr />
      <AcCheckboxGroup
        items={items1}
        onChange={(e) => {
          console.log('checked: ', e.target.value);
        }}
      />
    </Container>
  );
};
