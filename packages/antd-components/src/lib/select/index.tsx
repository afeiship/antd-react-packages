import React from 'react';
import ReactList from '@jswork/react-list';
import noop from '@jswork/noop';
import { Select } from 'antd';
import cx from 'classnames';

const CLASS_NAME = 'react-ant-select';

type StdEventTarget = {
  target: {
    value: any;
  };
};

type TemplateCallback = (item: { item: any; index: number }) => React.ReactNode;

type Props = {
  className?: string;
  items: any[];
  onChange: (inEvent: StdEventTarget) => void;
  template: TemplateCallback;
};

export class AcSelect extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    items: [],
    onChange: noop,
  };

  handleChange = (inValue) => {
    const { onChange } = this.props;
    onChange({
      target: { value: inValue },
    });
  };

  render() {
    const { className, onChange, ...props } = this.props;
    return (
      <ReactList
        allowEmpty
        nodeName={Select}
        onChange={this.handleChange}
        className={cx(CLASS_NAME, className)}
        {...props}
      />
    );
  }
}
