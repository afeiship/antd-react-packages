import React, { HTMLAttributes } from 'react';
import noop from '@jswork/noop';
import { Checkbox, CheckboxProps } from 'antd';
import cx from 'classnames';

const CLASS_NAME = 'ac-checkbox';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: boolean;
  onChange?: StdCallback;
} & CheckboxProps &
  HTMLAttributes<any>;

export class AcCheckbox extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  state = {
    value: this.props.value
  };

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const { value } = nextProps;
    if (value !== this.state.value) {
      this.setState({ value });
    }
    return true;
  }

  handleChange = (inEvent) => {
    const { checked } = inEvent.target;
    const { onChange } = this.props;
    const target = { value: checked };

    this.setState(target, () => {
      onChange!({ target });
    });
  };

  render() {
    const { className, onChange, value, defaultValue, ...props } = this.props;
    const _value = this.state.value;

    return (
      <Checkbox
        className={cx(CLASS_NAME, className)}
        checked={_value}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}
