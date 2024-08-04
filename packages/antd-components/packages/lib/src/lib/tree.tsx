import React from 'react';
import { Tree, TreeProps } from 'antd';
import cx from 'classnames';
import '@jswork/next-tree-walk';
import { treeKv, kv as KvTmpl } from '@jswork/antd-tpls';

const CLASS_NAME = 'ac-tree';
const DEFAULT_KV = {
  label: 'label',
  value: 'value'
};

type Props = {
  className?: string;
  items?: any[];
  kv?: Record<string, string>;
  template?: any;
  itemsKey?: string | ((index: number, item: any) => any);
  directory?: boolean;
} & TreeProps;

export class AcTree extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    directory: false,
    items: [],
    kv: DEFAULT_KV,
    template: treeKv,
    itemsKey: 'children'
  };

  get childView() {
    const { items, itemsKey } = this.props;
    return nx.treeWalk(items!, { template: this.template, itemsKey });
  }

  template = (args) => {
    const { template, kv } = this.props;
    if (kv === DEFAULT_KV) return template!(args);
    return KvTmpl(args, {
      component: Tree.TreeNode,
      ...kv
    });
  };

  render() {
    const { className, children, items, template, itemsKey, directory, ...props } = this.props;

    const RootComp: any = directory ? Tree.DirectoryTree : Tree;

    if (items?.length === 0) return null;

    return (
      <RootComp className={cx(CLASS_NAME, className)} {...props}>
        {this.childView}
      </RootComp>
    );
  }
}
