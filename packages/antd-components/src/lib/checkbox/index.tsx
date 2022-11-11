import React from 'react';
import ReactList from '@jswork/react-list';
import { Checkbox } from 'antd';
import cx from 'classnames';

const CLASS_NAME = 'react-ant-checkbox';

export class AcCheckbox extends React.Component {
  static displayName = CLASS_NAME;

  render() {
    return <Checkbox />;
  }
}
