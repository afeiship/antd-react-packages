import React from 'react';

const defaults = {
  label: 'label',
};

export const transferLabel = ({ item }, options?: any): React.ReactNode => {
  const opts = { ...defaults, ...options };
  return item[opts?.label];
};
