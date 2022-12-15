import React from "react";
import * as tpls from "@jswork/antd-tpls";
import { Select, Checkbox, Row, Col, Button, Space } from "antd";
import * as data from "./data";
import FormBuilder, { useForceUpdate } from "@jswork/antd-form-builder";
import {
  AcSelect,
  AcCheckableDropdown,
  AcCheckableTag,
  AcCheckableTagList,
  AcCheckbox,
  AcCheckboxGroup,
  AcDatePicker,
  AcInput,
  AcInputNumber,
  AcRadioGroup,
  AcRate,
  AcSwitch,
  AcTextarea,
  AcTransfer,
  AcRangePicker,
  AcSearch,
  AcUploadDragger,
  AcPreSelect,
  AcBreadcrumb,
  AcEditableTagGroup,
  AcTree,
  AcTreeSelect,
  AcUploadPictureCard,
  AcUploadPicture,
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
  AcCheckableDropdown,
  AcCheckableTag,
  AcCheckableTagList,
  AcCheckbox,
  AcCheckboxGroup,
  AcDatePicker,
  AcInput,
  AcInputNumber,
  AcRadioGroup,
  AcRate,
  AcSwitch,
  AcTextarea,
  AcTransfer,
  AcRangePicker,
  AcSearch,
  AcUploadDragger,
  AcPreSelect,
  AcBreadcrumb,
  AcEditableTagGroup,
  AcTree,
  AcTreeSelect,
  AcUploadPictureCard,
  AcUploadPicture,
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
