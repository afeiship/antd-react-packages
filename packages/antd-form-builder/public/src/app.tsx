import React from 'react';
import { AntdFormSchema } from '../../src/main';
import styled from 'styled-components';
import { pipes1 } from './pipes';
import { Button, Col, Row } from 'antd';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
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

  return (
    <Container>
      <dl>
        <dt>
          <h3>Use Form Schema</h3>
        </dt>
        <dd>
          <AntdFormSchema
            pipes={pipes1}
            presets={presets}
            meta={meta}
            caption={<h1>Hello FormSchema</h1>}
            onFinish={(e) => {
              console.log('target e: ', e);
            }}>
            <Row>
              <Col span={8}></Col>
              <Col span={16}>
                <Button htmlType="submit">Submit</Button>
              </Col>
            </Row>
          </AntdFormSchema>
        </dd>
      </dl>
    </Container>
  );
};
