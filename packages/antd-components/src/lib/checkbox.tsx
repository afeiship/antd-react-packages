import React from 'react';
import noop from '@jswork/noop';
import { Checkbox } from 'antd';
import cx from 'classnames';
import type { CheckboxProps } from 'antd/lib/checkbox';

const CLASS_NAME = 'react-ant-checkbox';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: boolean;
  defaultValue?: boolean;
  onChange?: StdCallback;
} & CheckboxProps;

export class AcCheckbox extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  state = {
    checked: this.props.value
  };

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

    return (
      <Checkbox
        className={cx(CLASS_NAME, className)}
        defaultChecked={defaultValue}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}
