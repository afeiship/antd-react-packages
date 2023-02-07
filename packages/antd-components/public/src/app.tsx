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
  AcUploadPictureCard
} from '../../src/main';
import { Space } from 'antd';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  const [val, setVal] = useState<string[]>(['s1']);
  const [pval, setPval] = useState<any>(['https://tva1.sinaimg.cn/large/007S8ZIlgy1gexw87htqhj305k05k74o.jpg']);
  const items3 = [
    { value: 's1', label: 'Status1' },
    { value: 's2', label: 'Status2' },
    { value: 's3', label: 'Status3' },
    { value: 's4', label: 'Status4' },
    { value: 's5', label: 'Status5' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setVal(['s1', 's3']);
    }, 1800);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPval(['https://tva1.js.work/large/da432263ly1hasqfsqfmmj20ei0bcweo.jpg']);
    }, 1800);
  }, []);

  return (
    <Container>
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
