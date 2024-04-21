import React from 'react';
import { Form } from 'antd';
import * as AcComponents from '@jswork/antd-components';
import nx from '@jswork/next';
import '@jswork/next-classify';

type NamePresets = Omit<FormFieldProps, 'name'>;
type WidgetPresets = Omit<FormFieldProps, 'widget'>;

interface PresetProps {
  name?: Record<string, NamePresets>;
  widget?: Record<string, WidgetPresets>;
}

export interface FormFieldProps {
  name?: string;
  label?: string;
  presets?: PresetProps;
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
    widget: 'ac-input',
    presets: {}
  };

  static setPresets(presets: PresetProps) {
    FormField.defaultProps.presets = presets;
  }

  get namePresets() {
    const { name, presets } = this.props;
    const namePresets = presets?.name || {};
    return namePresets[name!] || ({} as NamePresets);
  }

  get widgetPresets() {
    const { widget, presets } = this.props;
    const widgetPresets = presets?.widget || {};
    return widgetPresets[widget as string] || ({} as WidgetPresets);
  }

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

    const { name, label, ...restPresetsWidgetProps } = {
      ...this.widgetPresets,
      ...this.namePresets
    };

    return [
      { name, label },
      {
        autoFocus,
        autoComplete,
        placeholder,
        disabled,
        readOnly,
        required,
        size,
        ...widgetProps,
        ...restPresetsWidgetProps
      }
    ];
  }

  render() {
    const {
      presets,
      // name,
      // label,
      widget,
      widgetProps,
      placeholder,
      disabled,
      readOnly,
      required,
      ...restFormItemProps
    } = this.props;

    const Widget = this.widgetComponent;
    const [arg0, arg1] = this.widgetProps;
    // console.log('restFormItemProps: ', arg0, arg1);
    delete arg1['widgetProps'];
    // const [formItemProps, widgetProps as _widgetProps] = this.widgetProps;

    return (
      <Form.Item {...arg0} {...restFormItemProps}>
        <Widget {...arg1} />
      </Form.Item>
    );
  }
}

export default FormField;
