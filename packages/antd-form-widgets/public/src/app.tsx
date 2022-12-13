import React from 'react';
import FormBuilder from '@jswork/antd-form-builder/src/components/form-builder';
import styled from 'styled-components';
import { Button, Col, Row } from 'antd';
import '@jswork/antd-components/src/style.scss';
import '../../src/main';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  const items3 = [
    { value: 's1', label: 'Status1' },
    { value: 's2', label: 'Status2' },
    { value: 's3', label: 'Status3' }
  ];
  const meta = [
    { key: 'login', label: 'LOGIN as' },
    { key: 'username', label: 'Username' },
    {
      key: 'c1',
      label: 'checkable-dropdown',
      widget: 'ac:checkable-dropdown',
      widgetProps: { items: items3 }
    },
    {
      key: 'c2',
      label: 'Avater',
      widget: 'ac:upload-picture',
      widgetProps: {
        action: 'http://localhost:3200/weibo_api/interface/pic_upload.php'
      }
    },
    {
      key: 'c3',
      label: 'Photos',
      widget: 'ac:upload-picture-card',
      widgetProps: {
        action: 'http://localhost:3200/weibo_api/interface/pic_upload.php'
      }
    },
    // {key:'c4', label:"tag-list", widget: 'ac:editable-tag-group'}
  ] as any;

  return (
    <Container>
      <FormBuilder meta={meta} onFinish={(e) => console.log(e.target.value)}>
        <Row>
          <Col span={8}></Col>
          <Col span={16}>
            <Button htmlType="submit">Submit</Button>
          </Col>
        </Row>
      </FormBuilder>
    </Container>
  );
};
