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

  getMeta = () => {
    const { presets, meta } = this.props;
    const fields = meta.fields!;
    meta.fields = fields
      .map((field) => {
        if (field.key && presets![field.key]) {
          return { ...presets![field.key], ...field } as FieldType;
        }
        return null;
      })
      .filter(Boolean);
    return meta;
  };

  render() {
    const { className, form, meta, presets, ...props } = this.props;
    const _meta = this.getMeta();
    console.log(_meta);
    return <FormBuilder meta={_meta} form={form} {...props} />;
  }
}
