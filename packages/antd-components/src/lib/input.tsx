import React from 'react';
import noop from '@jswork/noop';
import { Input, InputProps } from 'antd';
import cx from 'classnames';

const CLASS_NAME = 'react-input';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: boolean;
  onChange?: StdCallback;
  autoComplete?: boolean;
} & InputProps;

export class AcInput extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    autoComplete: false
  };

  get complete() {
    return this.props.autoComplete ? 'on' : 'off';
  }

  render() {
    const { className, value, autoComplete, ...props } = this.props;
    return <Input className={cx(CLASS_NAME, className)} autoComplete={this.complete} {...props} />;
  }
}
