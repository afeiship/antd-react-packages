import React from 'react';
import noop from '@jswork/noop';
import cx from 'classnames';
import ReactList from '@jswork/react-list';
import { Space, Button, Tag } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const CLASS_NAME = 'ac-checkable-all';
const locales = {
  'zh-CN': { selectAll: '全部' },
  'en-US': { selectAll: 'All' }
};
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;
type Props = {
  /**
   * Main className.
   */
  className?: string;
  /**
   * The language key.
   */
  lang?: string;
  /**
   * The component data soruce.
   */
  items?: any[];
  /**
   * Runtime value.
   */
  value?: any[];
  /**
   * The event handler for `change`.
   */
  onChange?: StdCallback;
};

export class AcCheckableAll extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    lang: 'zh-CN',
    value: [],
    onChange: noop
  };

  state = {
    value: this.props.value
  };

  t = (inKey: string) => {
    const { lang } = this.props;
    return locales[lang!][inKey] || inKey;
  };

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const { value } = nextProps;
    if (value !== this.props.value) this.setState({ value });
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

  handleClearAll = () => {
    this.handleChange([]);
  };

  render() {
    const { className, items, value, onChange, ...props } = this.props;
    const label = this.t('selectAll');

    return (
      <Space direction="horizontal" className={cx(CLASS_NAME, className)}>
        <Button size="small" onClick={this.handleClearAll} className="ac-is-aside">
          {label}
        </Button>
        <ReactList
          items={items}
          template={({ item, index }) => {
            const _value = this.state.value as any[];
            const isChecked = _value?.includes(item.value);
            return (
              <Tag.CheckableTag
                className="ac-is-item"
                checked={isChecked}
                onChange={(checked) => {
                  const curSet = new Set([..._value]);
                  const method = checked ? 'add' : 'delete';
                  curSet[method](item.value);
                  // @ts-ignore
                  this.handleChange([...curSet]);
                }}
                key={index}>
                {item.label}
                {isChecked && <CloseOutlined />}
              </Tag.CheckableTag>
            );
          }}
          {...props}
        />
      </Space>
    );
  }
}
