/**
 * @email: aric.zheng@alo7.com
 * @description: A React page component.
 * @created_at: 2024-04-21 20:09:10
 */
import { FormField } from '@/main';
import { Button, Form } from 'antd';
import React from 'react';

export default () => {
  return (
    <>
      <h1>Form Field Demo</h1>
      <Form
        onFinish={(values) => console.log(values)}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}>
        <FormField
          label="Username1"
          name="username1"
          rules={[{ required: true, message: 'Please input your username!' }]}
        />
        <FormField
          label="Password1"
          name="password1"
          rules={[{ required: true, message: 'Please input your password!' }]}
        />
        <FormField
          name="remember1"
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
    </>
  );
};
