import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
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
  AcCheckableTag,
  AcCheckableAll,
  AcPreSelect,
  AcBreadcrumb,
  AcEditableTagGroup,
  AcTree,
  AcTreeSelect,
  AcUploadPictureCard
} from '../../src/main';
import { Space } from 'antd';

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
  ];

  const items4 = [
    {
      label: '0-0',
      value: '0-0',
      children: [
        {
          label: '0-0-0',
          value: '0-0-0',
          children: [
            { label: '0-0-0-0', value: '0-0-0-0' },
            { label: '0-0-0-1', value: '0-0-0-1' },
            { label: '0-0-0-2', value: '0-0-0-2' }
          ]
        },
        {
          label: '0-0-1',
          value: '0-0-1',
          children: [
            { label: '0-0-1-0', value: '0-0-1-0' },
            { label: '0-0-1-1', value: '0-0-1-1' },
            { label: '0-0-1-2', value: '0-0-1-2' }
          ]
        },
        {
          label: '0-0-2',
          value: '0-0-2'
        }
      ]
    },
    {
      label: '0-1',
      value: '0-1',
      children: [
        { label: '0-1-0-0', value: '0-1-0-0' },
        { label: '0-1-0-1', value: '0-1-0-1' },
        { label: '0-1-0-2', value: '0-1-0-2' }
      ]
    },
    {
      label: '0-2',
      value: '0-2'
    }
  ];

  return (
    <Container>
      <AcUploadPictureCard
        action="http://localhost:3200/weibo_api/interface/pic_upload.php"
        name="pic1"
      />
      <AcTreeSelect
        style={{ width: '100%' }}
        defaultValue={['0-0-1-0']}
        items={items4}
        onChange={(e) => {
          console.log('e: ', e.target.value);
        }}
      />
      <hr />
      <AcTree
        items={items4}
        onSelect={(e) => {
          console.log('e: ', e);
        }}
      />
      <hr />
      <AcEditableTagGroup
        onChange={(e) => {
          console.log('tag group value: ', e.target.value);
        }}
      />
      <hr />
      <AcBreadcrumb items={items3} />
      <hr />
      <Space direction="vertical" style={{ display: 'flex' }}>
        <AcPreSelect
          items={items1}
          onChange={(e) => {
            console.log('evt: ', e.target.value);
          }}
        />

        <AcPreSelect
          searchable
          inputOptions={{ placeholder: 'search...' }}
          items={items1}
          onChange={(e) => {
            console.log('evt: ', e.target.value);
          }}
        />
      </Space>
      <hr />
      <AcCheckableAll
        items={items3}
        lang="en-US"
        value={['s1']}
        onChange={(e) => {
          console.log('evt: ', e.target.value);
        }}
      />
      <hr />
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
      <hr />
      <Button>Submit</Button>
    </Container>
  );
};
