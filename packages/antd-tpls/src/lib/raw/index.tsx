import React from 'react';
import { Checkbox, Radio, Select } from 'antd';

interface Options {
  component: React.ComponentType<any>;

  [key: string]: any;
}

/**
 * Raw component template, for array of items.
 * @param item
 * @param index
 * @param options
 */
export const raw = ({ item, index }, options: Options) => {
  const { component: Component, ...otherProps } = options;

  return (
    <Component key={index} value={item} {...otherProps}>
      {item}
    </Component>
  );
};

export const checkboxRaw = (args) => {
  return raw(args, {
    component: Checkbox,
  });
};

export const selectRaw = (args) => {
  return raw(args, {
    component: Select.Option,
  });
};

export const radioRaw = (args, opts) => {
  const { isButton, ...otherProps } = opts || {};
  const RadioComponent = isButton ? Radio.Button : Radio;
  const radioProps = isButton ? otherProps : {};

  return raw(args, {
    component: RadioComponent,
    ...radioProps,
  });
};
