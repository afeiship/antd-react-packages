import React from 'react';
import { Select } from 'antd';

export const SelectKv = ({ item, index }) => {
  return (
    <Select.Option key={index} value={item.value}>
      {item.label}
    </Select.Option>
  );
};
