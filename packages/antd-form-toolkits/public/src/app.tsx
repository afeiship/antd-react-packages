import React from 'react';
import { FormField } from '../../src/main';
import styled from 'styled-components';
import { Form, Button } from 'antd';

const Container = styled.div`
  width: 80%;
  max-width: 600px;
  margin: 30px auto 0;
`;

export default () => {
  return (
    <Container>
      <Form
        onFinish={(values) => console.log(values)}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}>
        <FormField
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        />
        <FormField
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        />
        <FormField
          name="remember"
          label="Accept terms and conditions"
          widget="ac-checkbox"
          widgetProps={{ children: 'Remember me' }}
        />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};
