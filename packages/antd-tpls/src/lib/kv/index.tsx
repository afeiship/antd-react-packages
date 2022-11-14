import React from 'react';
import { Checkbox, Select, Radio } from 'antd';

interface Options {
  component: React.ComponentType<any>;
  value?: string;
  label?: string;

  [key: string]: any;
}

const defaults = {
  value: 'value',
  label: 'label',
};

/**
 * KV component template, for key-value pair.
 * @param item
 * @param index
 * @param options
 */
export const kv = ({ item, index }, options: Options) => {
  const opts = { ...defaults, ...options };
  const { component: Component, value, label, ...otherProps } = opts;
  const val = item[value];
  const children = item[label];

  return (
    <Component key={index} value={val} {...otherProps}>
      {children}
    </Component>
  );
};

// checkboxKv
export const checkboxKv = (args) => {
  return kv(args, {
    component: Checkbox,
  });
};

// selectKv
export const selectKv = (args) => {
  return kv(args, {
    component: Select.Option,
  });
};

// radioKv
export const radioKv = (args, opts) => {
  const { isButton, ...otherProps } = opts || {};
  const RadioComponent = isButton ? Radio.Button : Radio;
  const radioProps = isButton ? otherProps : {};

  return kv(args, {
    component: RadioComponent,
    ...radioProps,
  });
};
