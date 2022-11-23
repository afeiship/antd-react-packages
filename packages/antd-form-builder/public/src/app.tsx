import React from 'react';
import AntdFormBuilder, { useForceUpdate } from '../../src/main';
import { Form, Button, Row, Col } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  const [form] = Form.useForm();
  const forceUpdate = useForceUpdate();

  const meta = {
    initialValues: {
      username: 'afeiship',
      password: '123123'
    },
    fields: [
      { key: 'username' },
      { key: 'password' },
      { key: 'show-hobby', widget: 'checkbox', label: 'Show Hobby' }
    ]
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

  const hobbies = {
    key: 'hobbies',
    widget: 'checkbox-group',
    label: 'Hobbies',
    options: ['football', 'basketball', 'swimming']
  };

  // if (form.current) {
  console.log(form.getFieldValue('show-hobby'));
  // }

  return (
    <Container>
      <Form form={form} onValuesChange={forceUpdate} onFinish={(e) => console.log('e:', e)}>
        <AntdFormBuilder presets={presets} form={form} meta={meta} />
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
