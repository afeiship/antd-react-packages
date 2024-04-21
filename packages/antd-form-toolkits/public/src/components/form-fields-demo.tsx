/**
 * @email: aric.zheng@alo7.com
 * @description: A React page component.
 * @created_at: 2024-04-21 20:09:10
 */
import { FormFields } from '@/main';
import { Button, Form } from 'antd';
import React from 'react';

export default () => {
  return (
    <>
      <h1>Form Fields Demo</h1>
      <Form
        onFinish={(values) => console.log(values)}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}>
        <FormFields
          items={[
            {
              label: 'Username',
              name: 'username',
              rules: [{ required: true, message: 'Please input your username!' }]
            },
            {
              label: 'Password',
              name: 'password',
              rules: [{ required: true, message: 'Please input your password!' }]
            },
            {
              name: 'remember',
              label: 'Accept terms and conditions',
              widget: 'ac-checkbox',
              widgetProps: { children: 'Remember me' }
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
