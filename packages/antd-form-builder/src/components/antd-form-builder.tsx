import React, { Component } from 'react';
import { FormInstance } from 'antd';
import FormBuilder from 'antd-form-builder';
import { getComputedMeta, Presets, InnerMeta } from './helpers';

const CLASS_NAME = 'antd-form-builder';

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
    const _meta = getComputedMeta(presets!, meta);

    return <FormBuilder meta={_meta} form={form} {...props} />;
  }
}
