import React from 'react';
import noop from '@jswork/noop';
import { InputNumber, InputNumberProps } from 'antd';
import cx from 'classnames';

const CLASS_NAME = 'react-input-number';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: boolean;
  onChange?: StdCallback;
} & InputNumberProps;

export class AcInputNumber extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    onChange!({
      target: { value: inEvent }
    });
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    return (
      <InputNumber className={cx(CLASS_NAME, className)} onChange={this.handleChange} {...props} />
    );
  }
}
