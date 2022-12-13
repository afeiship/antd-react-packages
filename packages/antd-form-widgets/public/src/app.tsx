import React from 'react';
import AntdFormWidgets from '../../src/main';
import FormBuilder from '@jswork/antd-form-builder';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  const meta = [
    { key: 'login', label: 'LOGIN as' },
    { key: 'username', label: 'Username' }
  ] as any;

  return (
    <Container>
      <AntdFormWidgets />
      <FormBuilder meta={meta} />
    </Container>
  );
};
