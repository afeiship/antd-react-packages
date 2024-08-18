# antd-tpls
> Antd list templates.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/antd-tpls
```

## usage
1. import css
  ```scss
  @import "~@jswork/antd-tpls/dist/style.css";

  // or use sass
  @import "~@jswork/antd-tpls/dist/style.scss";

  // customize your styles:
  $antd-tpls-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import todo:ReactYourProjectName from '@jswork/antd-tpls';

  export default () => {
    return (
      <div className="p-5 border w-4/5 mx-auto mt-10 bg-gray-100 rounded-md hover:bg-gray-200">
        <todo:ReactYourProjectName className="debug-red inline-block p-1" />
      </div>
    );
  };

  ```

## preview
- https://afeiship.github.io/antd-tpls/

## license
Code released under [the MIT license](https://github.com/afeiship/antd-tpls/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/antd-tpls
[version-url]: https://npmjs.org/package/@jswork/antd-tpls

[license-image]: https://img.shields.io/npm/l/@jswork/antd-tpls
[license-url]: https://github.com/afeiship/antd-tpls/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/antd-tpls
[size-url]: https://github.com/afeiship/antd-tpls/blob/master/dist/antd-tpls.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/antd-tpls
[download-url]: https://www.npmjs.com/package/@jswork/antd-tpls
