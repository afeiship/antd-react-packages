import React from 'react';

interface Options {
  label?: string;
}

const defaults = {
  label: 'label',
};

export const transferLabel = ({ item }, options: Options) => {
  const { label } = { ...defaults, ...options };
  return item[label];
};
