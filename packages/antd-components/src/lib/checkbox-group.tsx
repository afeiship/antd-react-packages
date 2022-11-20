import React from 'react';
import ReactList from '@jswork/react-list';
import noop from '@jswork/noop';
import { Checkbox } from 'antd';
import cx from 'classnames';
import { checkboxKv } from '@jswork/antd-tpls';

const CLASS_NAME = 'ac-ant-checkbox';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;
type TemplateCallback = (item: { item: any; index: number }) => React.ReactNode;

export type AcCheckboxGroupProps = {
  className?: string;
  value?: any[];
  defaultValue?: any[];
  items?: any[];
  onChange?: StdCallback;
  onSearch?: StdCallback;
  template?: TemplateCallback;
} & typeof Checkbox.Group;

export class AcCheckboxGroup extends React.Component<AcCheckboxGroupProps> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    items: [],
    template: checkboxKv,
    onChange: noop,
    onSearch: noop
  };

  handleChange = (inEvent) => {
    const { onChange, onSearch } = this.props;
    const stdEvent = { target: { value: inEvent } };
    onChange!(stdEvent);
    onSearch!(stdEvent);
  };

  render() {
    const { className, items, template, onChange, onSearch, ...props } =
      this.props;
    return (
      <Checkbox.Group
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        {...props}>
        <ReactList items={items} template={template} />
      </Checkbox.Group>
    );
  }
}
