import React, { Component } from 'react';
import { FormInstance } from 'antd';
import FormBuilder, { Meta, FieldType } from 'antd-form-builder';

const CLASS_NAME = 'antd-form-builder';

interface Presets {
  [key: string]: [string, string, any];
}

export type AntdFormBuilderProps = {
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * Presets of fields.
   */
  presets?: Presets;
  /**
   * The form instance of antd.
   */
  form: FormInstance<any>;
  /**
   * The meta schema of form.
   */
  meta: Meta | FieldType | FieldType[];
};

export default class AntdFormBuilder extends Component<AntdFormBuilderProps> {
  static displayName = CLASS_NAME;
  static defaultProps = {};

  render() {
    const { className, form, meta, presets, ...props } = this.props;

    return <FormBuilder meta={meta} form={form} {...props} />;
  }
}
