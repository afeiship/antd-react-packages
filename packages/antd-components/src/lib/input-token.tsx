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
} & InputProps;

export class AcInputToken extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    autoComplete: false
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
    const { className, value, autoComplete, onChange, ...props } = this.props;
    return (
      <Input
        ref={this.rootRef}
        value={this.state.value}
        onChange={this.handleChange}
        addonAfter={
          <span className={`${CLASS_NAME}__token`} onClick={this.handleToken}>
            Token
          </span>
        }
        className={cx(CLASS_NAME, className)}
        autoComplete={this.complete}
        {...props}
      />
    );
  }
}
