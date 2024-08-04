import React from 'react';
import noop from '@jswork/noop';
import { Input } from 'antd';
import cx from 'classnames';
import { SearchProps } from 'antd/es/input';

const CLASS_NAME = 'ac-search';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: boolean;
  onChange?: StdCallback;
  onSearch?: StdCallback;
  autoComplete?: boolean;
} & SearchProps;

export class AcSearch extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    onSearch: noop,
    autoComplete: false,
    placeholder: '输入关键字搜索'
  };

  get complete() {
    return this.props.autoComplete ? 'on' : 'off';
  }

  handleSearch = (inEvent) => {
    const { onSearch } = this.props;
    onSearch!({ target: { value: inEvent } });
  };

  render() {
    const { className, value, autoComplete, onSearch, ...props } = this.props;
    return (
      <Input.Search
        className={cx(CLASS_NAME, className)}
        autoComplete={this.complete}
        onSearch={this.handleSearch}
        {...props}
      />
    );
  }
}
