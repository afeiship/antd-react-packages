import React from 'react';
import noop from '@jswork/noop';
import { InputNumber, InputNumberProps } from 'antd';
import cx from 'classnames';

const CLASS_NAME = 'ac-input-number';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: number;
  onChange?: StdCallback;
} & InputNumberProps;

export class AcInputNumber extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  state = {
    value: this.props.value
  };

  shouldComponentUpdate(inProps: Readonly<Props>): boolean {
    const { value } = inProps;
    if (value !== this.props.value) this.setState({ value });
    return true;
  }

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    const target = { value: inEvent };
    this.setState(target);
    onChange!({ target });
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    const { value: stateValue } = this.state;
    return (
      <InputNumber
        className={cx(CLASS_NAME, className)}
        value={stateValue}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}
