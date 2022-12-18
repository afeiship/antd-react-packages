import React from 'react';
import noop from '@jswork/noop';
import { Transfer, TransferProps } from 'antd';
import cx from 'classnames';
import { transferLabel } from '@jswork/antd-tpls';

const CLASS_NAME = 'ac-transfer';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;
type TemplateCallback = (item: { item: any }, options?: any) => React.ReactNode;

type Props = {
  className?: string;
  items?: any[];
  template: TemplateCallback;
  value?: any[];
  onChange?: StdCallback;
} & TransferProps<any>;

export class AcTransfer extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    items: [],
    template: transferLabel,
    onChange: noop
  };

  get templateCallback(): any {
    const { template } = this.props;
    return (item: any) => template({ item });
  }

  state = {
    value: this.props.value
  };

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const { value } = nextProps;
    const isNewValue = this.props.value !== value;
    if (isNewValue && value !== this.state.value) {
      this.setState({ value });
    }
    return true;
  }

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    const target = { value: inEvent };
    this.setState(target, () => onChange!({ target }));
  };

  render() {
    const { className, value, onChange, items, template, ...props } = this.props;

    const _value = this.state.value;

    return (
      <Transfer
        className={cx(CLASS_NAME, className)}
        dataSource={items}
        render={this.templateCallback}
        targetKeys={_value}
        rowKey={(item) => item.value}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}
