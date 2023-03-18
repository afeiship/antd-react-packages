import React from 'react';
import { FormBuilder } from '../../src/main';
import styled from 'styled-components';
import { pipes1 } from './pipes';
import { Button, Col, Row } from 'antd';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  const meta = {
    initialValues: [
      fetch('https://api.github.com/users/afeiship').then((r) => r.json()),
      (res) => {
        return {
          login: res.login,
          username: 'afeiship',
          password: '123123'
        };
      }
    ],
    fields: [
      { key: 'login', label: 'LOGIN as' },
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

  const items3 = [
    { value: 's1', label: 'Status1' },
    { value: 's2', label: 'Status2' },
    { value: 's3', label: 'Status3' }
  ];

  const meta2 = {
    fields: [
      { key: 'login', label: 'LOGIN as' },
      { key: 'username', label: 'Username' },
      {
        key: 'c1',
        label: 'checkable-dropdown',
        widget: 'ac:checkable-dropdown',
        widgetProps: { items: items3 }
      },
      { key: 'avatar' },
      { key: 'photos' }
    ]
  };

  console.log('meta2', meta2);

  return (
    <Container>
      <FormBuilder
        pipes={pipes1}
        presets={presets}
        meta={meta}
        caption={<h1>Hello FormSchema</h1>}
        onFinish={(e) => {
          console.log('target e: ', e.target.value);
        }}>
        <Row>
          <Col span={8}></Col>
          <Col span={16}>
            <Button htmlType="submit">Submit</Button>
          </Col>
        </Row>
      </FormBuilder>

      <hr />
      {/*<FormBuilder meta={meta2} onFinish={(e) => console.log(e.target.value)}>*/}
      {/*  <Row>*/}
      {/*    <Col span={8}></Col>*/}
      {/*    <Col span={16}>*/}
      {/*      <Button htmlType="submit">Submit</Button>*/}
      {/*    </Col>*/}
      {/*  </Row>*/}
      {/*</FormBuilder>*/}
    </Container>
  );
};
