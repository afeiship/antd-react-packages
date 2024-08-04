import React from 'react';
import cx from 'classnames';
import noop from '@jswork/noop';
import { TreeSelect, TreeSelectProps } from 'antd';
import '@jswork/next-tree-walk';
import { treeSelectKv } from '@jswork/antd-tpls';

const CLASS_NAME = 'ac-tree-select';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

// @see: https://github.com/afeiship/react-ant-tree-select

type Props = {
  className?: string;
  items?: any[];
  template?: any;
  itemsKey?: string | ((index: number, item: any) => any);
  onChange?: StdCallback;
} & TreeSelectProps;

export class AcTreeSelect extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    items: [],
    template: treeSelectKv,
    itemsKey: 'children',
    onChange: noop
  };

  get childView() {
    const { items, template, itemsKey } = this.props;
    return nx.treeWalk(items!, { template, itemsKey });
  }

  handleChange = (inValue) => {
    const { onChange } = this.props;
    onChange!({ target: { value: inValue } });
  };

  render() {
    const {
      className,
      items,
      itemsKey,
      template,
      treeData,
      onChange,
      ...props
    } = this.props;

    return (
      <TreeSelect
        data-component={CLASS_NAME}
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        treeNodeFilterProp="title"
        {...props}>
        {this.childView}
      </TreeSelect>
    );
  }
}
