import React from 'react';
import noop from '@jswork/noop';
import cx from 'classnames';
import ReactList from '@jswork/react-list';
import { Checkbox, Space } from 'antd';
import { AcCheckableTag } from './checkable-tag';

const CLASS_NAME = 'ac-checkable-all';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  items?: any[];
  value?: any[];
  onChange?: StdCallback;
};

export class AcCheckableAll extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    value: [],
    onChange: noop
  };

  state = {
    value: this.props.value
  };

  get isAllSelected() {
    const { items } = this.props;
    const { value } = this.state;
    return value?.length === items?.length;
  }

  get isIndeterminate() {
    const { value } = this.state;
    return value!?.length > 0 && !this.isAllSelected;
  }

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const { value } = nextProps;
    if (value !== this.props.value) {
      this.setState({ value });
    }
    return true;
  }

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    const target = { value: inEvent };
    this.setState(target, () => {
      onChange!({ target });
    });
  };

  handleSelectAll = (inEvent) => {
    const checked = inEvent.target.checked;
    const { items } = this.props;
    const values = items!.map((item) => item.value);
    this.handleChange(checked ? values : []);
  };

  render() {
    const { className, items, value, onChange, ...props } = this.props;
    const _value = this.state.value as any[];

    return (
      <Space direction="horizontal" className={cx(CLASS_NAME, className)}>
        <Checkbox
          indeterminate={this.isIndeterminate}
          checked={this.isAllSelected}
          onChange={this.handleSelectAll}>
          Select All
        </Checkbox>
        <ReactList
          items={items}
          template={({ item, index }) => {
            const _value = this.state.value as any[];
            const isChecked = _value?.includes(item.value);
            return (
              <AcCheckableTag
                value={isChecked}
                onChange={(e) => {
                  const curSet = new Set([..._value]);
                  const method = e.target.value ? 'add' : 'delete';
                  curSet[method](item.value);
                  // @ts-ignore
                  this.handleChange([...curSet]);
                }}
                key={index}>
                {item.label}
              </AcCheckableTag>
            );
          }}
          {...props}
        />
      </Space>
    );
  }
}
