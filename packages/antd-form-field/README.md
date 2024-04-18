# antd-form-field
> Antd all in one form field.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/antd-form-field
```

## usage
1. import css
  ```scss
  @import "~@jswork/antd-form-field/dist/style.css";

  // or use sass
  @import "~@jswork/antd-form-field/dist/style.scss";

  // customize your styles:
  $antd-form-field-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import AntdFormField from '@jswork/antd-form-field';
  import styled from 'styled-components';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
  `;

  export default (props: any) => {
    return (
      <Container>
        <AntdFormField />
      </Container>
    );
  };

  ```

## preview
- https://afeiship.github.io/antd-form-field/

## license
Code released under [the MIT license](https://github.com/afeiship/antd-form-field/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/antd-form-field
[version-url]: https://npmjs.org/package/@jswork/antd-form-field

[license-image]: https://img.shields.io/npm/l/@jswork/antd-form-field
[license-url]: https://github.com/afeiship/antd-form-field/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/antd-form-field
[size-url]: https://github.com/afeiship/antd-form-field/blob/master/dist/antd-form-field.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/antd-form-field
[download-url]: https://www.npmjs.com/package/@jswork/antd-form-field
