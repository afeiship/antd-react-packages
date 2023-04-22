import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AcSelect,
  AcTransfer,
  AcCheckboxGroup,
  AcCheckableDropdown,
  AcCheckableTagList,
  AcCheckableTag,
  AcUploadPicture,
  AcUploadPictureCard,
  AcInputToken,
  AcCodeFlask,
  AcInputHidden,
  AcInputNumber,
  AcInput,
  AcEditableTagGroup
} from '../../src/main';
import { Space } from 'antd';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  const [nvalue, setNvalue] = useState<number>(1);
  const [v2, setV2] = useState<string>('str1');
  const [val, setVal] = useState<string[]>(['s1']);
  const [pval, setPval] = useState<any>([
    'https://tva1.sinaimg.cn/large/007S8ZIlgy1gexw87htqhj305k05k74o.jpg'
  ]);
  const items3 = [
    { value: 's1', label: 'Status1' },
    { value: 's2', label: 'Status2' },
    { value: 's3', label: 'Status3' },
    { value: 's4', label: 'Status4' },
    { value: 's5', label: 'Status5' }
  ];

  const items4 = [
    { id: 10001001, name: '用户-查' },
    { id: 10001002, name: '用户-增' },
    { id: 10001003, name: '用户-改' },
    { id: 10001004, name: '用户-删' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setVal(['s1', 's3']);
    }, 1800);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPval('https://tva1.js.work/large/da432263ly1hasqfsqfmmj20ei0bcweo.jpg');
    }, 1800);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setNvalue(20);
      setV2('str111');
    }, 1800);
  }, []);

  return (
    <Container>
      <AcEditableTagGroup readOnly value={val} />
      <hr />
      <AcSelect items={items4} kv={{ value: 'id', label: 'name' }} />
      <AcInput
        value={v2}
        onChange={(e) => {
          console.log('evt:', e.target.value);
        }}
      />
      <hr />
      <AcInputNumber
        value={nvalue}
        onChange={(e) => {
          console.log('e: ', e.target.value);
        }}
      />
      <AcInputHidden />
      <hr />
      <AcCodeFlask />
      <AcInputToken
        value={'abc'}
        onChange={(e) => {
          console.log('e.value:', e.target.value);
        }}
      />
      <AcTransfer
        value={val}
        items={items3}
        onChange={(e) => console.log('AcTransfer', e.target.value)}
      />
      <hr />
      <AcSelect items={items3} value={'s1'} onChange={(e) => console.log(e.target.value)} />
      <AcSelect
        items={items3}
        mode="multiple"
        value={['s1', 's3']}
        onChange={(e) => console.log(e.target.value)}
      />
      <hr />
      <AcCheckboxGroup
        value={val}
        items={items3}
        onChange={(e) => {
          console.log('AcCheckboxGroup e: ', e.target.value);
        }}
      />
      <hr />
      <AcUploadPicture
        value={pval}
        // transformResponse={(v) => v.map((item) => item.pid)}
        onChange={(e) => console.log(e.target.value)}
        action="http://localhost:3200/weibo_api/interface/pic_upload.php"
      />
      <hr />
      <AcUploadPictureCard
        value={pval}
        onChange={(e) => console.log(e.target.value)}
        action="http://localhost:3200/weibo_api/interface/pic_upload.php"
      />
      <hr />
      <AcCheckableDropdown items={items3} onChange={(e) => console.log(e.target.value)} />
      <hr />
      <AcCheckableTagList
        items={items3}
        value={val}
        onChange={(e) => {
          console.log('AcCheckableTagList e: ', e.target.value);
        }}
      />

      <hr />

      <Space>
        <AcCheckableTag closeable>Tag1 + closeable</AcCheckableTag>
        <AcCheckableTag closeable toggleable>
          Tag1 + closeable + toggle
        </AcCheckableTag>
        <AcCheckableTag disabled closeable>
          Tag + disabled + closable
        </AcCheckableTag>
      </Space>
    </Container>
  );
};
