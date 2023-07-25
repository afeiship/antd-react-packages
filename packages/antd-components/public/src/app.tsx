import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AcUpload, AcUploadDragger } from '../../src/main';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  return (
    <Container>
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
    </Container>
  );
};
