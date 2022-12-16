import React from "react";
import * as tpls from "@jswork/antd-tpls";
import { Select, Checkbox, Row, Col, Button, Space } from "antd";
import * as data from "./data";
import FormBuilder, {
  installWidgets,
} from "@jswork/antd-form-builder/src/main";
import * as AcComponents from "@jswork/antd-components/src/main";

const ReactLiveScope = {
  React,
  ...React,
  tpls,
  data,

  ...AcComponents,
  FormBuilder,

  // antd
  Select,
  Checkbox,
  Row,
  Col,
  Button,
  Space,
};

installWidgets(AcComponents);

export default ReactLiveScope;
