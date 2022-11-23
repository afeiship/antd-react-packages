import React from 'react';
import AntdFormBuilder from '../../src/main';
import { Form, FormInstance, Button, Row, Col } from 'antd';
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
    fields: [
      { key: 'username', label: 'User Name', widget: 'input' },
      { key: 'password', label: 'Password', widget: 'password' }
    ]
  };

  return (
    <Container>
      <Form
        ref={formRef}
        onFinish={(e) => {
          console.log('e:', e);
        }}>
        <AntdFormBuilder form={formRef.current!} meta={meta} />
        <Row>
          <Col span={8}></Col>
          <Col span={16}>
            <Button htmlType="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
