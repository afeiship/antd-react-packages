import React, { Component } from 'react';
import { FormInstance } from 'antd';
import FormBuilder, { Meta, FieldType } from 'antd-form-builder';

const CLASS_NAME = 'antd-form-builder';

interface Presets {
  [key: string]: Omit<FieldType, 'key'>;
}

type InnerMeta = {
  fields?: FieldType[];
} & Omit<Meta, 'fields'>;

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
  meta: InnerMeta;
};

export default class AntdFormBuilder extends Component<AntdFormBuilderProps> {
  static displayName = CLASS_NAME;
  static defaultProps = {};

  getComputedMeta = () => {
    const { presets, meta } = this.props;
    const fields = meta.fields!;
    meta.fields = fields.map((field) => {
      const matched = field.key && presets![field.key];
      if (!matched) return field;
      return { ...presets![field.key], ...field } as FieldType;
    });
    return meta;
  };

  render() {
    const { className, form, meta, presets, ...props } = this.props;
    const _meta = this.getComputedMeta();

    return <FormBuilder meta={_meta} form={form} {...props} />;
  }
}
