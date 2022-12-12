import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AcCheckableDropdown,
  AcCheckableAll,
  AcCheckableTag,
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
      <AcCheckableDropdown items={items3} onChange={(e) => console.log(e.target.value)} />
      <hr />
      <AcCheckableAll
        items={items3}
        value={val}
        onChange={(e) => {
          console.log('e: ', e.target.value);
        }}
      />

      <hr />
      <AcUploadPictureCard
        maxCount={1}
        multiple={false}
        action="http://localhost:3200/weibo_api/interface/pic_upload.php"
        name="pic1"
      />
      <hr />

      <Space>
        <AcCheckableTag closable>Tag1 + closable</AcCheckableTag>
        <AcCheckableTag disabled closable>
          Tag + disabled + closable
        </AcCheckableTag>
      </Space>
    </Container>
  );
};
