import React from 'react';
import { Form } from 'antd';
import * as AcComponents from '@jswork/antd-components';
import nx from '@jswork/next';
import '@jswork/next-classify';

export interface FormFieldProps {
  name: string;
  label?: string;
  widget?: string | React.ComponentType;
  widgetProps?: Record<string, any>;

  // quick widget props
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;

  [key: string]: any;
}

class FormField extends React.Component<FormFieldProps, any> {
  static defaultProps = {
    widget: 'ac-input'
  };

  get WidgetComponent() {
    const { widget } = this.props;
    if (typeof widget === 'function') return widget;
    const widgetName = nx.classify(widget!);
    return AcComponents[widgetName!] || AcComponents['AcInput'];
  }

  get widgetProps() {
    const { widgetProps, placeholder, disabled, readOnly, required } = this.props;

    return {
      placeholder,
      disabled,
      readOnly,
      required,
      ...widgetProps
    };
  }

  render() {
    const {
      label,
      name,
      widget,
      widgetProps,
      placeholder,
      disabled,
      readOnly,
      required,
      ...restFormItemProps
    } = this.props;

    const Widget = this.WidgetComponent;

    return (
      <Form.Item label={label} name={name} {...restFormItemProps}>
        <Widget {...this.widgetProps} />
      </Form.Item>
    );
  }
}

export default FormField;
