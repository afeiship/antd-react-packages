import React from 'react';
import noop from '@jswork/noop';
import { Tree, TreeProps } from 'antd';
import cx from 'classnames';
import nxTreeWalk from '@jswork/next-tree-walk';

const CLASS_NAME = 'ac-tree';
const DEFAULT_TEMPLATE = ({ item }, cb) => {
  const { value, label } = item;
  return (
    <Tree.TreeNode key={value} value={value} title={label}>
      {cb()}
    </Tree.TreeNode>
  );
};

type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;
type TemplateCallback = (item: { item: any; index: number }) => React.ReactNode;

type Props = {
  className?: string;
  value?: number;
  items?: any[];
  template?: TemplateCallback;
  itemsKey?: string | ((index: number, item: any) => any);
  onChange?: StdCallback;
  directory?: boolean;
} & TreeProps;

export class AcTree extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    directory: false,
    items: [],
    template: DEFAULT_TEMPLATE,
    itemsKey: 'children',
    onChange: noop
  };

  get childView() {
    const { items, template, itemsKey } = this.props;
    return nxTreeWalk(items, { template, itemsKey });
  }

  render() {
    const {
      className,
      children,
      items,
      template,
      itemsKey,
      directory,
      prefixCls,
      ...props
    } = this.props;

    const RootComp: any = directory ? Tree.DirectoryTree : Tree;

    if (items?.length === 0) return null;

    return (
      <RootComp className={cx(CLASS_NAME, className)} {...props}>
        {this.childView}
      </RootComp>
    );
  }
}
