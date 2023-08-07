import FormBuilder, { FieldType, Meta } from 'antd-form-builder';
import React from 'react';
import nx from '@jswork/next';

export type InnerMeta = {
  fields?: FieldType[];
  initValues?: Record<string, any> | (() => Record<string, any>);
} & Omit<Meta, 'fields' | 'initValues'>;

export interface Presets {
  widgets?: {
    [key: string]: Omit<FieldType, 'widget'>;
  };
  fields?: {
    [key: string]: Omit<FieldType, 'key'>;
  };
}

/**
 * Smart merge meta fields with presets.
 * @param presets
 * @param meta
 */
export const getComputedMeta = (presets: Presets, meta: InnerMeta) => {
  const fields = meta.fields!;
  if (!presets) return meta;
  meta.fields = fields.map((field) => {
    // process fields
    const matchedField = nx.get(presets, `fields.${field.key}`);
    if (matchedField) field = nx.mix(null, matchedField, field);
    // process widgets
    const matchedWidget = nx.get(presets, `widgets.${field.widget}`);
    if (matchedWidget) field = nx.mix(null, matchedWidget, field);
    return field;
  });
  return meta;
};

/**
 * Generate helper methods for form from meta.fields.
 * @param meta
 */
export const generateHelpers = (meta: InnerMeta) => {
  const find = (key) => meta.fields!.find((item) => item.key === key);
  const where = (key) => meta.fields!.filter((item) => item.key === key);
  const findBy = (fn: (item: FieldType) => boolean) => meta.fields!.find(fn);
  const whereBy = (fn: (item: FieldType) => boolean) => meta.fields!.filter(fn);

  return {
    find(target: string | ((item: FieldType) => boolean)) {
      if (typeof target === 'string') return find(target);
      return findBy(target);
    },
    where(target: string | ((item: FieldType) => boolean)) {
      if (typeof target === 'string') return where(target);
      return whereBy(target);
    }
  };
};

/**
 * Init values when form ready.
 * @param meta
 * @param form
 */
export const initForm = (meta: InnerMeta, form): Promise<void> => {
  const initValues =
    typeof meta.initValues === 'function' ? meta.initValues() : meta.initValues;

  return new Promise((resolve) => {
    form?.setFieldsValue(initValues);
    resolve();
  });
};

/**
 * React hook for form builder.
 */
export const useForceUpdate = () => {
  const [value, setValue] = React.useState(0);
  return () => setValue(value + 1);
};

export const installWidgets = (inComponents) => {
  Object.keys(inComponents).forEach((item) => {
    const Comp = inComponents[item];
    const formSchema = Comp.formSchema;
    if (formSchema) {
      const prefix = formSchema.split('-')[0];
      const key = formSchema.replace(prefix + '-', prefix + ':');
      FormBuilder.defineWidget(key, Comp);
    }
  });
};
