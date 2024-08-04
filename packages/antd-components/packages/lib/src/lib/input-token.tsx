import React from 'react';
import noop from '@jswork/noop';
import { Button, Input, InputProps } from 'antd';
import { UnlockOutlined, LockOutlined } from '@ant-design/icons';
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
  labelCreate?: string;
  labelRemove?: string;
} & InputProps;

export class AcInputToken extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    autoComplete: false,
    labelCreate: '生成Token',
    labelRemove: '去掉Token'
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
    const { labelCreate, labelRemove } = this.props;
    return (
      <Button.Group>
        <Button
          size="small"
          icon={<LockOutlined />}
          className={`${CLASS_NAME}__action`}
          onClick={this.handleTokenCreate}>
          {labelCreate}
        </Button>
        <Button
          size="small"
          icon={<UnlockOutlined />}
          className={`${CLASS_NAME}__action`}
          onClick={this.handleTokenRemove}>
          {labelRemove}
        </Button>
      </Button.Group>
    );
  }

  handleTokenCreate = () => {
    this.doChange(nanoid());
  };

  handleTokenRemove = () => {
    this.doChange('');
  };

  handleChange = (inEvent) => {
    const { value } = inEvent.target;
    this.doChange(value);
    this.rootRef.current.input.focus();
  };

  doChange = (inValue) => {
    const { onChange } = this.props;
    const target = { value: inValue };
    this.setState(target);
    onChange!({ target });
  };

  render() {
    const { className, value, autoComplete, onChange, labelCreate, labelRemove, ...props } =
      this.props;
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
