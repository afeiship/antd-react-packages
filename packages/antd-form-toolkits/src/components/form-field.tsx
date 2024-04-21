import React from 'react';
import { Form } from 'antd';
import * as AcComponents from '@jswork/antd-components';

interface FormFieldProps {
  label: string;
  name: string;
  widget?: string;
  widgetProps?: any;

  [key: string]: any;
}

const camelCase = (str: string) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

class FormField extends React.Component<FormFieldProps, any> {
  static defaultProps = {
    widget: 'ac-input'
  };

  render() {
    const { label, name, widget, widgetProps, ...restFormItemProps } = this.props;
    const stdName = capitalize(camelCase(widget!));
    const Widget = AcComponents[stdName!];
    console.log('this.props: ', widget, stdName, this.props, AcComponents);

    return (
      <Form.Item label={label} name={name} {...restFormItemProps}>
        <Widget {...widgetProps} />
      </Form.Item>
    );
  }
}

export default FormField;
