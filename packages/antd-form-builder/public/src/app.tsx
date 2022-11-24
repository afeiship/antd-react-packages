import React, { useEffect, useState } from 'react';
import { FormSchema } from '../../src/main';
import styled from 'styled-components';
import { pipes1 } from './pipes';
import { Button, Col, FormInstance, Row } from 'antd';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  const [form, setForm] = useState<FormInstance>();
  const meta = {
    initialValues: {
      login: '',
      username: 'afeiship',
      password: '123123'
    },
    fields: [
      { key: 'login', label: 'LOGIN as' },
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

  useEffect(() => {
    if (form) {
      fetch('https://api.github.com/users/afeiship')
        .then((r) => r.json())
        .then((res) => {
          // form?.setFieldsValue(res);
          console.log('res: ', res, form);
          form.setFieldValue('login', res.login);
        });
    }
  }, [form]);

  return (
    <Container>
      <dl>
        <dt>
          <h3>Use Form Schema</h3>
        </dt>
        <dd>
          <FormSchema
            pipes={pipes1}
            presets={presets}
            meta={meta}
            caption={<h1>Hello FormSchema</h1>}
            onInit={(e) => {
              setForm(e.target.value);
            }}
            onFinish={(e) => {
              console.log('target e: ', e);
            }}>
            <Row>
              <Col span={8}></Col>
              <Col span={16}>
                <Button htmlType="submit">Submit</Button>
              </Col>
            </Row>
          </FormSchema>
        </dd>
      </dl>
    </Container>
  );
};
