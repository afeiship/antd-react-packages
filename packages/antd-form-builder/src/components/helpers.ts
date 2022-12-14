import { FieldType, Meta } from 'antd-form-builder';
import React from 'react';

export const toValue = (value: any) => value;

export type InnerMeta = {
  fields?: FieldType[];
  initValues?:
    | Record<string, any>
    | [() => Promise<any>]
    | [() => Promise<any>, (response: any) => Record<string, any>];
} & Omit<Meta, 'fields' | 'initValues'>;

export interface Presets {
  widgets?: {
    [key: string]: Omit<FieldType, 'key'>;
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
    const matchedWidget = field.widget && presets.widgets![field.widget];
    const matchedField = field.key && presets.fields![field.key];
    if (!matchedWidget && !matchedField) return field;
    return { ...matchedWidget, ...matchedField, ...field };
  });
  return meta;
};

/**
 * Generate helper methods for form from meta.fields.
 * @param meta
 */
export const generateHelpers = (meta: InnerMeta) => {
  const find = (key: string) => meta.fields!.find((item) => item.key === key);
  const where = (key: string) =>
    meta.fields!.filter((item) => item.key === key);
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
export const initForm = (meta, form): Promise<void> => {
  const initValues = meta.initialValues;
  const isFromAsync = Array.isArray(initValues);
  return new Promise((resolve) => {
    if (isFromAsync) {
      const [api, transform] = initValues;
      const _transform = transform || toValue;
      api.then((res) => {
        form.setFieldsValue(_transform(res));
        resolve();
      });
    } else {
      form.setFieldsValue(initValues);
      resolve();
    }
  });
};

/**
 * React hook for form builder.
 */
export const useForceUpdate = () => {
  const [value, setValue] = React.useState(0);
  return () => setValue(value + 1);
};
