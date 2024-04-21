import React from 'react';
import { Form } from 'antd';
import * as AcComponents from '@jswork/antd-components';
import nx from '@jswork/next';
import '@jswork/next-classify';
import '@jswork/next-compact-object';

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

  processProps() {
    const { name, label, widget, presets, ...restProps } = this.props;
    const namedPresets = presets?.name || {};
    const widgetPresets = presets?.widget || {};
    const presetProps = {
      ...namedPresets[name as string],
      ...widgetPresets[widget as string]
    };
    return {
      ...presetProps,
      name: presetProps.name || name,
      label: presetProps.label || label,
      widget: presetProps.widget || widget,
      ...restProps
    } as FormFieldProps;
  }

  get widgetComponent() {
    const { widget } = this.processProps();
    if (typeof widget === 'function') return widget;
    const widgetName = nx.classify(widget as string);
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
    } = this.processProps();

    return nx.compactObject({
      autoFocus,
      autoComplete,
      placeholder,
      disabled,
      readOnly,
      required,
      size,
      ...widgetProps
    });
  }

  render() {
    const {
      presets,
      name,
      label,
      widget,
      widgetProps,
      placeholder,
      disabled,
      readOnly,
      required,
      ...restFormItemProps
    } = this.processProps();

    const Widget = this.widgetComponent;

    return (
      <Form.Item name={name} label={label} {...restFormItemProps}>
        <Widget {...this.widgetProps} />
      </Form.Item>
    );
  }
}

export default FormField;
