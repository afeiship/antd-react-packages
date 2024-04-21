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
  autoFocus?: boolean;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  size?: 'large' | 'default' | 'small';

  [key: string]: any;
}

class FormField extends React.Component<FormFieldProps, any> {
  static defaultProps = {
    widget: 'ac-input'
  };

  get widgetComponent() {
    const { widget } = this.props;
    if (typeof widget === 'function') return widget;
    const widgetName = nx.classify(widget!);
    return AcComponents[widgetName!] || AcComponents.AcInput;
  }

  get widgetProps() {
    const {
      widgetProps,
      autoFocus,
      autoComplete,
      placeholder,
      disabled,
      readOnly,
      required,
      size
    } = this.props;

    return {
      autoFocus,
      autoComplete,
      placeholder,
      disabled,
      readOnly,
      required,
      size,
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

    const Widget = this.widgetComponent;

    return (
      <Form.Item label={label} name={name} {...restFormItemProps}>
        <Widget {...this.widgetProps} />
      </Form.Item>
    );
  }
}

export default FormField;
