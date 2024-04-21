/**
 * @email: aric.zheng@alo7.com
 * @description: A React page component.
 * @created_at: 2024-04-21 20:09:10
 */
import { FormField, FormFields } from '@/main';
import { Button, Form } from 'antd';
import React from 'react';

// set name presets for FormFields
FormField.setPresets({
  name: {
    username: {
      label: 'Username',
      rules: [{ required: true }]
    },
    password: {
      label: 'Password',
      rules: [{ required: true }]
    },
    email: {
      label: 'Email',
      disabled: true
    }
  },
  widget: {
    'ac-checkbox': {
      name: 'remember',
      label: 'Accept terms and conditions',
      rules: [{ required: true }],
      widgetProps: { children: 'Remember' }
    }
  }
});

export default () => {
  return (
    <>
      <h1>Form Fields Demo2 with name/widget presets</h1>
      <Form
        initialValues={{
          username: 'admin',
          password: '123456',
          email: 'admin@example.com',
          remember: false
        }}
        onFinish={(values) => console.log(values)}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}>
        <FormFields
          items={[
            { name: 'username' },
            { name: 'password', rules: [{ required: true }] },
            { name: 'email', disabled: true },
            { widget: 'ac-checkbox', label: 'NEW=OVERRIDE' }
          ]}
        />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
