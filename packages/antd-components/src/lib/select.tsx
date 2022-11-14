import React, { HTMLAttributes } from 'react';
import ReactList from '@jswork/react-list';
import noop from '@jswork/noop';
import { Select } from 'antd';
import cx from 'classnames';
import { selectKv } from '@jswork/antd-tpls';

const CLASS_NAME = 'react-ant-select';

type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;
type TemplateCallback = (item: { item: any; index: number }) => React.ReactNode;

type Props = {
  className?: string;
  items?: any[];
  onChange?: StdCallback;
  onSearch?: StdCallback;
  template?: TemplateCallback;
} & HTMLAttributes<any>;

export class AcSelect extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    items: [],
    template: selectKv,
    onChange: noop,
    onSearch: noop
  };

  handleChange = (inValue) => {
    const { onChange, onSearch } = this.props;
    const stdEvent: StdEventTarget = { target: { value: inValue } };
    onChange!(stdEvent);
    onSearch!(stdEvent);
  };

  render() {
    const { className, onChange, onSearch, ...props } = this.props;
    return (
      <ReactList
        allowEmpty
        nodeName={Select}
        onChange={this.handleChange}
        className={cx(CLASS_NAME, className)}
        {...props}
      />
    );
  }
}
