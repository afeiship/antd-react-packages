import React from 'react';
import { Checkbox } from 'antd';

export const checkboxKv = ({ item, index }) => {
  return (
    <Checkbox key={index} value={item.value}>
      {item.label}
    </Checkbox>
  );
};
