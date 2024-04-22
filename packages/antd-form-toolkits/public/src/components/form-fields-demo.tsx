/**
 * @email: aric.zheng@alo7.com
 * @description: A React page component.
 * @created_at: 2024-04-21 20:09:10
 */
import { FormFields } from '@/main';
import { Button, Form } from 'antd';
import React from 'react';

// set name presets for FormFields
export default () => {
  return (
    <>
      <h1>Form Fields Demo</h1>
      <Form
        initialValues={{
          username2: 'admin',
          password2: '123456',
          email2: 'admin@example.com',
          remember2: false
        }}
        onFinish={(values) => console.log(values)}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}>
        <FormFields
          items={[
            { label: 'Username2', name: 'username2', size: 'large', rules: [{ required: true }] },
            { label: 'Password2', name: 'password2', rules: [{ required: true }] },
            { label: 'Email2', name: 'email2', disabled: true },
            {
              name: 'remember2',
              label: 'Accept terms and conditions',
              widget: 'ac-checkbox',
              widgetProps: { children: 'Remember' }
            }
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
