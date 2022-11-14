import React from 'react';
import { Checkbox } from 'antd';

export const checkboxRaw = ({ item, index }) => {
  return <Checkbox key={index}>{item}</Checkbox>;
};
