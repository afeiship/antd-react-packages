import React from "react";
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
} from "@jswork/antd-components";
import FormBuilder, { useForceUpdate } from "@jswork/antd-form-builder";
import * as tpls from "@jswork/antd-tpls";
import { Select, Checkbox, Row, Col, Button } from "antd";

const ReactLiveScope = {
  React,
  ...React,
  tpls,

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
};

export default ReactLiveScope;
