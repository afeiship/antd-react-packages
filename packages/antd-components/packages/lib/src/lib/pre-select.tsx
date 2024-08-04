import noop from '@jswork/noop';
import cx from 'classnames';
import React from 'react';
import { AcInput } from './input';
import { AcSelect } from './select';
import { AcSearch } from './search';

const CLASS_NAME = 'ac-pre-select';
const DEFAULT_VALUE = { option: null, keyword: '' };

export interface Value {
  option: string;
  keyword: string;
}

export type AcPreSelectProps = {
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * Default value.
   */
  value?: Value;
  /**
   * Select options.
   */
  items?: any[];
  /**
   * The change handler.
   */
  onChange?: Function;
  /**
   * The handler for search.
   */
  onSearch?: Function;
  /**
   * If use search input.
   */
  searchable?: boolean;
  /**
   * The prefix select options.
   */
  selectOptions?: any;
  /**
   * The suffix input options.
   */
  inputOptions?: any;
};

export class AcPreSelect extends React.Component<AcPreSelectProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {
    onChange: noop,
    onSearch: noop,
    searchable: false
  };

  state = { value: this.props.value };

  get addonView() {
    const { items, selectOptions } = this.props;
    const { value } = this.state;

    return (
      <AcSelect
        value={value?.option}
        items={items}
        onChange={this.handleChange.bind(this, 'option')}
        {...selectOptions}
      />
    );
  }

  handleFiledAction = (inField, inEvent, inCallback) => {
    const { value } = this.state;
    const _value = value || DEFAULT_VALUE;
    _value![inField] = inEvent.target.value;
    const target = { value: _value };
    this.setState(target);
    inCallback!({ target });
  };

  handleChange = (inField, inEvent) => {
    this.handleFiledAction(inField, inEvent, this.props.onChange);
    if (inField === 'option') {
      this.handleFiledAction(inField, inEvent, this.props.onSearch);
    }
  };

  handleSearch = (inField, inEvent) => {
    this.handleFiledAction(inField, inEvent, this.props.onSearch);
  };

  render() {
    const {
      className,
      value,
      onChange,
      onSearch,
      searchable,
      selectOptions,
      inputOptions,
      ...props
    } = this.props;

    const AsTag = searchable ? AcSearch : AcInput;
    const _value = this.state.value;
    const computedProps = searchable
      ? { onSearch: this.handleSearch.bind(this, 'keyword') }
      : null;

    return (
      <AsTag
        data-component={CLASS_NAME}
        className={cx(CLASS_NAME, className)}
        addonBefore={this.addonView}
        value={_value?.keyword}
        onChange={this.handleChange.bind(this, 'keyword')}
        {...computedProps}
        {...props}
        {...inputOptions}
      />
    );
  }
}
