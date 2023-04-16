import React from 'react';
import noop from '@jswork/noop';
import { Switch, SwitchProps } from 'antd';
import cx from 'classnames';

const CLASS_NAME = 'ac-switch';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: boolean;
  onChange?: StdCallback;
} & SwitchProps;

export class AcSwitch extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  state = {
    value: Boolean(this.props.value)
  };

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const { value } = nextProps;
    if (value !== this.props.value) this.setState({ value });
    return true;
  }

  handleChange = (value) => {
    const { onChange } = this.props;
    const target = { value };
    this.setState(target, () => onChange!({ target }));
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    const _value = this.state.value;

    return (
      <Switch
        checked={_value}
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}
