import React from 'react';
import { Form } from 'antd';
import * as AcComponents from '@jswork/antd-components';
import nx from '@jswork/next';
import '@jswork/next-classify';

interface FormFieldProps {
  label: string;
  name: string;
  widget?: string;
  widgetProps?: any;

  [key: string]: any;
}

class FormField extends React.Component<FormFieldProps, any> {
  static defaultProps = {
    widget: 'ac-input'
  };

  render() {
    const { label, name, widget, widgetProps, ...restFormItemProps } = this.props;
    const widgetName = nx.classify(widget!);
    const Widget = AcComponents[widgetName!];

    return (
      <Form.Item label={label} name={name} {...restFormItemProps}>
        <Widget {...widgetProps} />
      </Form.Item>
    );
  }
}

export default FormField;
