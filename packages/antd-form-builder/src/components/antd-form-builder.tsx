import React, { Component } from 'react';
import { FormInstance } from 'antd';
import FormBuilder, { Meta, FieldType } from 'antd-form-builder';
import { getComputedMeta } from './helpers';

const CLASS_NAME = 'antd-form-builder';

interface Presets {
  [key: string]: Omit<FieldType, 'key'>;
}

type InnerMeta = {
  fields?: FieldType[];
} & Omit<Meta, 'fields'>;

export const useForceUpdate = () => {
  const [value, setValue] = React.useState(0);
  return () => setValue(value + 1);
};

export type AntdFormBuilderProps = {
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

  render() {
    const { form, meta, presets, ...props } = this.props;
    const _meta = getComputedMeta(presets, meta);

    return <FormBuilder meta={_meta} form={form} {...props} />;
  }
}
