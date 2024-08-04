import React from 'react';
import ReactList from '@jswork/react-list';
import noop from '@jswork/noop';
import { Select, SelectProps } from 'antd';
import cx from 'classnames';
import { selectKv, kv as KvTmpl } from '@jswork/antd-tpls';

const CLASS_NAME = 'ac-select';
const DEFAULT_KV = {
  label: 'label',
  value: 'value'
};

type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;
type TemplateCallback = (item: { item: any; index: number }) => React.ReactNode;

type Props = {
  className?: string;
  items?: any[];
  kv?: Record<string, string>;
  onChange?: StdCallback;
  onSearch?: StdCallback;
  template?: TemplateCallback;
} & Omit<SelectProps, 'options'>;

export class AcSelect extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    placeholder: '请选择',
    items: [],
    kv: DEFAULT_KV,
    template: selectKv,
    onChange: noop,
    onSearch: noop
  };

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

  handleChange = (inValue) => {
    const { onChange, onSearch } = this.props;
    const target = { value: inValue };
    const stdEvent: StdEventTarget = { target: { value: inValue } };
    this.setState(target, () => {
      onChange!(stdEvent);
      onSearch!(stdEvent);
    });
  };

  template = (args) => {
    const { template, kv } = this.props;
    if (kv === DEFAULT_KV) return template!(args);
    return KvTmpl(args, {
      component: Select.Option,
      ...kv
    });
  };

  render() {
    const { className, onChange, onSearch, value, template, ...props } = this.props;
    const { value: _value } = this.state;
    return (
      <ReactList
        allowEmpty
        as={Select}
        onChange={this.handleChange}
        className={cx(CLASS_NAME, className)}
        value={_value}
        template={this.template}
        {...props}
      />
    );
  }
}
