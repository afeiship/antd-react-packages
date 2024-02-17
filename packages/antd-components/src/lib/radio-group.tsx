import React, { HTMLAttributes } from 'react';
import ReactList from '@jswork/react-list';
import noop from '@jswork/noop';
import { Radio } from 'antd';
import cx from 'classnames';
import { radioKv } from '@jswork/antd-tpls/dist/esm';

const CLASS_NAME = 'ac-radio-group';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;
type TemplateCallback = (item: { item: any; index: number }, opts?: any) => React.ReactNode;

type Props = {
  className?: string;
  value?: any;
  defaultValue?: any;
  items?: any[];
  onChange?: StdCallback;
  onSearch?: StdCallback;
  template?: TemplateCallback;
  templateOptions?: any;
  buttonStyle?: 'solid' | 'outline';
} & HTMLAttributes<any>;

export class AcRadioGroup extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    items: [],
    template: radioKv,
    onChange: noop,
    onSearch: noop
  };

  get templateCallback() {
    const { template, templateOptions } = this.props;
    return (item) => template!(item, templateOptions);
  }

  state = { value: this.props.value };

  static getDerivedStateFromProps(inProps: Readonly<Props>, inState: any) {
    const { value } = inProps;
    if (value !== inState.value) return { value };
    return null;
  }

  handleChange = (inEvent) => {
    const { onChange, onSearch } = this.props;
    const { value } = inEvent.target;
    const target = { value };
    this.setState(target);
    onChange!({ target });
    onSearch!({ target });
  };

  render() {
    const { className, items, template, templateOptions, onChange, onSearch, ...props } =
      this.props;

    return (
      <Radio.Group className={cx(CLASS_NAME, className)} onChange={this.handleChange} {...props}>
        <ReactList items={items} template={this.templateCallback} />
      </Radio.Group>
    );
  }
}
