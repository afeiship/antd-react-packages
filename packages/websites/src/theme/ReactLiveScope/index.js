import React from "react";
import { AcSelect, AcCheckbox, AcCheckboxGroup } from "@jswork/antd-components";
import * as tpls from "@jswork/antd-tpls";
import { Select, Checkbox } from "antd";

const ReactLiveScope = {
  React,
  ...React,
  tpls,
  AcSelect,
  AcCheckbox,
  AcCheckboxGroup,

  // antd
  Select,
  Checkbox,
};

export default ReactLiveScope;
