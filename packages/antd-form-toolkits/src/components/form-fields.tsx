import React from 'react';
import cx from 'classnames';
import FormField, { FormFieldProps } from './form-field';

interface FormFieldsProps {
  className?: string;
  items: FormFieldProps[];
  as?: string | React.ComponentType<any>;
}

interface FormFieldsState {}

class FormFields extends React.Component<FormFieldsProps, FormFieldsState> {
  static defaultProps = {
    items: [],
    as: React.Fragment
  };

  render() {
    const { className, items, as } = this.props;
    const AsComponent = as as React.ComponentType<any>;
    const asProps = as === React.Fragment ? {} : { className: cx('antd-form-fields', className) };
    const itemsWithIndex = items.map((field, index) => <FormField key={index} {...field} />);
    return <AsComponent {...asProps} children={itemsWithIndex} />;
  }
}

export default FormFields;
