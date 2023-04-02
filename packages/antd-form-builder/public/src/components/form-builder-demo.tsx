import { Button, Col, Form, Row } from 'antd';
import { FormBuilder, useForceUpdate } from '../../../src/main';
import React from 'react';

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
    fields: {
      username: {
        label: 'User Name',
        widget: 'input'
      },
      password: {
        label: 'Password',
        widget: 'password'
      }
    }
  };

  const hobbies = {
    key: 'hobbies',
    widget: 'checkbox-group',
    label: 'Hobbies',
    options: ['football', 'basketball', 'swimming']
  };

  console.log(hobbies, form.getFieldValue('show-hobby'));

  return (
    <dl>
      <dt>
        <h3>Use Form builder</h3>
      </dt>
      <dd>
        <Form
          form={form}
          onValuesChange={forceUpdate}
          onFinish={(e) => console.log('e:', e)}>
          <FormBuilder presets={presets} form={form} meta={meta} />
          <Row>
            <Col span={8}></Col>
            <Col span={16}>
              <Button htmlType="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
      </dd>
    </dl>
  );
};
