import React from "react";
import { AcSelect, AcCheckbox } from "@jswork/antd-components";
import { Select, Checkbox } from "antd";

const ReactLiveScope = {
  React,
  ...React,
  AcSelect,
  AcCheckbox,
  
  
  // antd
  Select,
  Checkbox,
};

export default ReactLiveScope;
