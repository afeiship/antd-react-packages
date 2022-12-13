import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
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
  const [val, setVal] = useState<string[]>([]);
  const items3 = [
    { value: 's1', label: 'Status1' },
    { value: 's2', label: 'Status2' },
    { value: 's3', label: 'Status3' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setVal(['s1']);
    }, 1000);
  }, []);

  return (
    <Container>
      <AcUploadPicture
        onChange={(e) => console.log(e.target.value)}
        action="http://localhost:3200/weibo_api/interface/pic_upload.php"
      />
      <hr />
      <AcUploadPictureCard
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
