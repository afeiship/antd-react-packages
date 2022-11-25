import { Breadcrumb } from 'antd';
import React from 'react';

export const breadcrumbDefault = ({ item, index, items }) => {
  const last = items?.length - 1 === index;
  const child = last ? <span>{item.label}</span> : <a href={item.value}>{item.label}</a>;
  return <Breadcrumb.Item key={index}>{child}</Breadcrumb.Item>;
};
