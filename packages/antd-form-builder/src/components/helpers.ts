import { FieldType, Meta } from 'antd-form-builder';

export type InnerMeta = {
  fields?: FieldType[];
} & Omit<Meta, 'fields'>;

export interface Presets {
  [key: string]: Omit<FieldType, 'key'>;
}

export const getComputedMeta = (presets: Presets, meta: InnerMeta) => {
  const fields = meta.fields!;
  meta.fields = fields.map((field) => {
    const matched = field.key && presets![field.key];
    if (!matched) return field;
    return { ...presets![field.key], ...field } as FieldType;
  });
  return meta;
};

export const getHelpers = (meta: InnerMeta) => {
  const find = (key: string) => meta.fields!.find((item) => item.key === key);
  const where = (key: string) => meta.fields!.filter((item) => item.key === key);
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
