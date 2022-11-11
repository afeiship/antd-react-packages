import React from 'react';
import { Select } from 'antd';

export const SelectRaw = ({ item, index }) => {
  return <Select.Option key={index}>{item}</Select.Option>;
};
