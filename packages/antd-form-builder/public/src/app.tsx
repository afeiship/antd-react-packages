import React from 'react';
import AntdFormBuilder from '../../src/main';
import { Form, FormInstance, Button } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  const formRef = React.createRef<FormInstance>();
  const meta = {
    initialValues: {
      username: 'afeiship',
      password: '123123'
    },
    fields: [{ key: 'username' }, { key: 'password' }]
  };

  const presets = {
    username: {
      label: 'User Name',
      widget: 'input'
    },
    password: {
      label: 'Password',
      widget: 'password'
    }
  };

  return (
    <Container>
      <Form
        ref={formRef}
        layout="vertical"
        onFinish={(e) => {
          console.log('e:', e);
        }}>
        <AntdFormBuilder presets={presets} form={formRef.current!} meta={meta} />
        <Button htmlType="submit">Submit</Button>
      </Form>
    </Container>
  );
};
