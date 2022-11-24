import { FieldType } from 'antd-form-builder';

export const getComputedMeta = (presets, meta) => {
  const fields = meta.fields!;
  meta.fields = fields.map((field) => {
    const matched = field.key && presets![field.key];
    if (!matched) return field;
    return { ...presets![field.key], ...field } as FieldType;
  });
  return meta;
};
