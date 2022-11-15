import React from 'react';
import styled from 'styled-components';
import * as tpls from '@jswork/antd-tpls';
import {
  AcSelect,
  AcCheckbox,
  AcCheckboxGroup,
  AcInput,
  AcInputNumber,
  AcRadioGroup,
  AcRate,
  AcSwitch,
  AcDatePicker,
  AcTextarea,
  AcTransfer,
  AcRangePicker,
  AcSearch,
  AcUploadDragger,
  AcCheckableTag
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

  return (
    <Container>
      <AcCheckableTag
        value={false}
        onChange={(e) => {
          console.log('evt: ', e.target.value);
        }}>
        Normal
      </AcCheckableTag>

      <AcCheckableTag
        value={false}
        closable
        onChange={(e) => {
          console.log('evt: ', e.target.value);
        }}>
        Closeable
      </AcCheckableTag>
      <hr />
      <AcUploadDragger />
      <hr />
      <AcSearch
        allowClear
        onChange={(e) => {
          console.log('search: ', e.target.value);
        }}
      />
      <hr />
      <AcRangePicker
        onChange={(e) => {
          console.log('range evt: ', e.target.value);
        }}
      />
      <hr />
      <AcTransfer
        items={items2}
        oneWay={false}
        titles={['Left', 'Right']}
        onChange={(e) => {
          console.log('transfer evt: ', e.target.value);
        }}
      />
      <hr />
      <AcTextarea
        defaultValue="abc"
        autoSize={{ minRows: 2, maxRows: 10 }}
        placeholder="Please input text..."
        onChange={(e) => {
          console.log('evt: ', e.target.value);
        }}
      />
      <hr />
      <AcDatePicker
        style={{ width: '100%' }}
        showTime
        defaultValue="2022-11-14 18:00:25"
        onChange={(e) => {
          console.log('e: ', e.target.value);
        }}
      />
      <hr />
      <div>
        <strong> AcSwitch: </strong>
        <AcSwitch />
      </div>
      <hr />
      <AcRate />
      <hr />
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
      <AcInput placeholder="Input text." style={{ width: '100%' }} />
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
