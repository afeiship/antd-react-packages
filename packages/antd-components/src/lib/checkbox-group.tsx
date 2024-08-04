import React from 'react';
import ReactList from '@jswork/react-list';
import noop from '@jswork/noop';
import { Checkbox } from 'antd';
import cx from 'classnames';
import { checkboxKv } from '@jswork/antd-tpls';
import { CheckboxGroupProps } from 'antd/es/checkbox';

const CLASS_NAME = 'ac-checkbox-group';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;
type TemplateCallback = (item: { item: any; index: number }) => React.ReactNode;

export type AcCheckboxGroupProps = {
  className?: string;
  value?: any[];
  items?: any[];
  onChange?: StdCallback;
  onSearch?: StdCallback;
  template?: TemplateCallback;
} & CheckboxGroupProps;

export class AcCheckboxGroup extends React.Component<AcCheckboxGroupProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    items: [],
    value: [],
    template: checkboxKv,
    onChange: noop,
    onSearch: noop
  };

  state = {
    value: this.props.value
  };

  shouldComponentUpdate(nextProps: Readonly<AcCheckboxGroupProps>): boolean {
    const { value } = nextProps;
    const isNewValue = nextProps.value !== this.props.value;
    if (isNewValue && this.state.value !== value) {
      this.setState({ value });
    }
    return true;
  }

  handleChange = (inEvent) => {
    const { onChange, onSearch } = this.props;
    const target = { value: inEvent };
    const stdEvent = { target };
    this.setState(target, () => {
      onChange!(stdEvent);
      onSearch!(stdEvent);
    });
  };

  render() {
    const { className, items, template, onChange, onSearch, children, value, ...props } =
      this.props;
    const { value: stateValue } = this.state;

    return (
      <Checkbox.Group
        className={cx(CLASS_NAME, className)}
        value={stateValue}
        onChange={this.handleChange}
        {...props}>
        <ReactList items={items} template={template} />
      </Checkbox.Group>
    );
  }
}
