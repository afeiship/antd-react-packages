import React from 'react';
import noop from '@jswork/noop';
import cx from 'classnames';
import ReactList from '@jswork/react-list';
import { Checkbox, Space } from 'antd';
import { AcCheckableTag } from './checkable-tag';
import { AcCheckbox } from './checkbox';

const CLASS_NAME = 'ac-checkable-all';
const locales = {
  'zh-CN': {
    selectAll: '全选'
  },
  'en-US': {
    selectAll: 'Select All'
  }
};
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;
type Props = {
  className?: string;
  mode?: 'tag' | 'checkbox';
  lang?: 'zh-CN' | 'en-US';
  items?: any[];
  value?: any[];
  onChange?: StdCallback;
};

export class AcCheckableAll extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    mode: 'checkbox',
    lang: 'zh-CN',
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

  t = (inKey: string) => {
    const { lang } = this.props;
    return locales[lang!][inKey] || inKey;
  };

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
    const { className, items, value, onChange, mode, ...props } = this.props;
    const isTag = mode === 'tag';
    const Component: React.ComponentType<any> = isTag
      ? AcCheckableTag
      : AcCheckbox;

    return (
      <Space direction="horizontal" className={cx(CLASS_NAME, className)}>
        <Checkbox
          indeterminate={this.isIndeterminate}
          checked={this.isAllSelected}
          onChange={this.handleSelectAll}>
          {this.t('selectAll')}
        </Checkbox>
        <ReactList
          items={items}
          template={({ item, index }) => {
            const _value = this.state.value as any[];
            const isChecked = _value?.includes(item.value);
            return (
              <Component
                value={isChecked}
                onChange={(inEvent) => {
                  const curSet = new Set([..._value]);
                  const method = inEvent.target.value ? 'add' : 'delete';
                  curSet[method](item.value);
                  // @ts-ignore
                  this.handleChange([...curSet]);
                }}
                key={index}>
                {item.label}
              </Component>
            );
          }}
          {...props}
        />
      </Space>
    );
  }
}
