# antd-form-builder
> A wrapper for antd-form-builder.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/antd-form-builder
```

## usage
1. import css
  ```scss
  @import "~@jswork/antd-form-builder/dist/style.css";

  // or use sass
  @import "~@jswork/antd-form-builder/dist/style.scss";

  // customize your styles:
  $antd-form-builder-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import AntdFormBuilder from '@jswork/antd-form-builder';
  import styled from 'styled-components';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
  `;

  export default (props: any) => {
    return (
      <Container>
        <AntdFormBuilder />
      </Container>
    );
  };

  ```

## preview
- https://afeiship.github.io/antd-form-builder/

## license
Code released under [the MIT license](https://github.com/afeiship/antd-form-builder/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/antd-form-builder
[version-url]: https://npmjs.org/package/@jswork/antd-form-builder

[license-image]: https://img.shields.io/npm/l/@jswork/antd-form-builder
[license-url]: https://github.com/afeiship/antd-form-builder/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/antd-form-builder
[size-url]: https://github.com/afeiship/antd-form-builder/blob/master/dist/antd-form-builder.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/antd-form-builder
[download-url]: https://www.npmjs.com/package/@jswork/antd-form-builder
