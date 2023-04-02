import React from 'react';
import noop from '@jswork/noop';
import { Input, InputProps } from 'antd';
import { nanoid } from 'nanoid';
import cx from 'classnames';

const CLASS_NAME = 'ac-input-token';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: string;
  onChange?: StdCallback;
  autoComplete?: boolean;
  label?: string;
} & InputProps;

export class AcInputToken extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    autoComplete: false,
    label: '生成Token'
  };

  private rootRef = React.createRef<any>();
  state = { value: this.props.value };

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const { value } = nextProps;
    if (value !== this.props.value) this.setState({ value });
    return true;
  }

  get complete() {
    return this.props.autoComplete ? 'on' : 'off';
  }

  get tokenView() {
    const { label } = this.props;
    return (
      <span className={`${CLASS_NAME}__token`} onClick={this.handleToken}>
        {label}
      </span>
    );
  }

  handleToken = () => {
    const value = nanoid();
    this.doChange(value);
    this.rootRef.current.input.focus();
  };

  handleChange = (inEvent) => {
    const { value } = inEvent.target;
    this.doChange(value);
  };

  doChange = (inValue) => {
    const { onChange } = this.props;
    const target = { value: inValue };
    this.setState(target);
    onChange!({ target });
  };

  render() {
    const { className, value, autoComplete, onChange, label, ...props } = this.props;
    return (
      <Input
        ref={this.rootRef}
        value={this.state.value}
        onChange={this.handleChange}
        addonAfter={this.tokenView}
        className={cx(CLASS_NAME, className)}
        autoComplete={this.complete}
        {...props}
      />
    );
  }
}
