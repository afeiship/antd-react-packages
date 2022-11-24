/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const globby = require("globby");
const getMenus = (key) =>
  globby.sync(`docs/${key}/*.mdx`).map((item) => item.slice(5, -4));

module.exports = {
  mainSidebar: {
    "antd-components": getMenus("antd-components"),
    "antd-form-builder": getMenus("antd-form-builder"),
  },
};
