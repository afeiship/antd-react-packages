# antd-form-widgets
> Predefined form builder widgets.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/antd-form-widgets
```

## usage
1. import css
  ```scss
  @import "~@jswork/antd-form-widgets/dist/style.css";

  // or use sass
  @import "~@jswork/antd-form-widgets/dist/style.scss";

  // customize your styles:
  $antd-form-widgets-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import AntdFormWidgets from '@jswork/antd-form-widgets';
  import styled from 'styled-components';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
  `;

  export default (props: any) => {
    return (
      <Container>
        <AntdFormWidgets />
      </Container>
    );
  };

  ```

## preview
- https://afeiship.github.io/antd-form-widgets/

## license
Code released under [the MIT license](https://github.com/afeiship/antd-form-widgets/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/antd-form-widgets
[version-url]: https://npmjs.org/package/@jswork/antd-form-widgets

[license-image]: https://img.shields.io/npm/l/@jswork/antd-form-widgets
[license-url]: https://github.com/afeiship/antd-form-widgets/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/antd-form-widgets
[size-url]: https://github.com/afeiship/antd-form-widgets/blob/master/dist/antd-form-widgets.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/antd-form-widgets
[download-url]: https://www.npmjs.com/package/@jswork/antd-form-widgets
