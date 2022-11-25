import React from "react";
import * as tpls from "@jswork/antd-tpls";
import { Select, Checkbox, Row, Col, Button, Space } from "antd";
import * as data from "./data";
import FormBuilder, { useForceUpdate } from "@jswork/antd-form-builder";
import {
  AcSelect,
  AcCheckbox,
  AcCheckboxGroup,
  AcInput,
  AcInputNumber,
  AcRadioGroup,
  AcRate,
  AcSwitch,
  AcDatePicker,
  AcTextarea,
  AcTransfer,
  AcRangePicker,
  AcSearch,
  AcUploadDragger,
  AcCheckableTag,
  AcCheckableAll,
  AcPreSelect,
  AcBreadcrumb,
  AcEditableTagGroup,
  AcTree,
  AcTreeSelect,
  AcUploadPictureCard,
  AcTimePicker,
  AcSlider,
  AcSliderRange,
} from "@jswork/antd-components/src/main";

// import "@jswork/antd-components/src/style.scss";

const ReactLiveScope = {
  React,
  ...React,
  tpls,
  data,

  AcSelect,
  AcCheckbox,
  AcCheckboxGroup,
  AcInput,
  AcInputNumber,
  AcRadioGroup,
  AcRate,
  AcSwitch,
  AcDatePicker,
  AcTextarea,
  AcTransfer,
  AcRangePicker,
  AcSearch,
  AcUploadDragger,
  AcCheckableTag,
  AcCheckableAll,
  AcPreSelect,
  AcBreadcrumb,
  AcEditableTagGroup,
  AcTree,
  AcTreeSelect,
  AcUploadPictureCard,
  AcTimePicker,
  AcSlider,
  AcSliderRange,

  FormBuilder,
  useForceUpdate,

  // antd
  Select,
  Checkbox,
  Row,
  Col,
  Button,
  Space,
};

export default ReactLiveScope;
