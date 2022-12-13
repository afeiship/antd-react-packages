import React from 'react';
import { Tree, TreeProps } from 'antd';
import cx from 'classnames';
import nxTreeWalk from '@jswork/next-tree-walk';
import { treeKv } from '@jswork/antd-tpls';

const CLASS_NAME = 'ac-tree';

type Props = {
  className?: string;
  items?: any[];
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
    template: treeKv,
    itemsKey: 'children'
  };

  get childView() {
    const { items, template, itemsKey } = this.props;
    return nxTreeWalk(items!, { template, itemsKey });
  }

  render() {
    const {
      className,
      children,
      items,
      template,
      itemsKey,
      directory,
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
