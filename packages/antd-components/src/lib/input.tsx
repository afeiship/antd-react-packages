import React from 'react';
import noop from '@jswork/noop';
import { Input, InputProps } from 'antd';
import cx from 'classnames';

const CLASS_NAME = 'ac-input';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  onChange?: StdCallback;
  autoComplete?: boolean;
} & InputProps;

export class AcInput extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    autoComplete: false
  };

  state = { value: this.props.value };

  shouldComponentUpdate(inProps: Readonly<Props>): boolean {
    const { value } = inProps;
    if (value !== this.props.value) this.setState({ value });
    return true;
  }

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    const { value } = inEvent.target;
    const target = { value };
    this.setState(target);
    onChange!({ target });
  };

  get complete() {
    return this.props.autoComplete ? 'on' : 'off';
  }

  render() {
    const { className, value, autoComplete, onChange, ...props } = this.props;
    const { value: stateValue } = this.state;

    return (
      <Input
        className={cx(CLASS_NAME, className)}
        autoComplete={this.complete}
        value={stateValue}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}
