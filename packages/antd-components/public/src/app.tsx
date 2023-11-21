import React, { useState } from 'react';
import styled from 'styled-components';
import { AcEditableTagGroup, AcUploadDragger, AcCodeFlask } from '../../src/main';
import { Button, Space } from 'antd';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  const [v, setV] = useState(['t1', 't2']);
  return (
    <Container>
      <AcEditableTagGroup />
      <AcCodeFlask />
      <AcUploadDragger
        onRequest={(file) => {
          const fd = new FormData();
          fd.append('file', file);
          fd.append('actionName', 'sys-admin-users-add');
          return fetch('http://dev.com/api/common/oss/upload', {
            method: 'POST',
            body: fd,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer QzI8Lt3rifOqGNfZpndDrTnXVmk='
            }
          }).then((r) => r.json());
        }}
      />
      <footer>
        <Space>
          <Button
            onClick={(e) => {
              nx.alert('道可道，非常道；名可名，非常名。');
            }}>
            Show alert
          </Button>
          <Button
            onClick={async (e) => {
              const res = await nx.confirm('道可道，非常道；名可名，非常名。');
              console.log('res: ', res);
            }}>
            Show Confirm
          </Button>
          <Button
            onClick={async (e) => {
              const res = await nx.prompt('Input some value');
              console.log('res', res);
            }}>
            Show Promote
          </Button>
        </Space>
      </footer>
    </Container>
  );
};
