import React from 'react';
import { Form } from 'antd';
import * as AcComponents from '@jswork/antd-components';

interface FormFieldProps {
  label: string;
  name: string;
  widget?: string;
  widgetProps?: any;
}

class FormField extends React.Component<FormFieldProps, any> {
  static defaultProps = {
    widget: 'ac-input'
  };

  render() {
    const { label, name, widget, widgetProps, ...restFormItemProps } = this.props;
    const Widget = AcComponents[widget!];
    return (
      <Form.Item label={label} name={name} {...restFormItemProps}>
        <Widget {...widgetProps} />
      </Form.Item>
    );
  }
}

export default FormField;
