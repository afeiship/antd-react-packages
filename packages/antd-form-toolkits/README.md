# antd-form-toolkits
> Form tookits for antd.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/antd-form-toolkits
```

## usage
1. import css
  ```scss
  @import "~@jswork/antd-form-toolkits/dist/style.css";

  // or use sass
  @import "~@jswork/antd-form-toolkits/dist/style.scss";

  // customize your styles:
  $antd-form-toolkits-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import AntdFormToolkits from '@jswork/antd-form-toolkits';
  import styled from 'styled-components';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
  `;

  export default (props: any) => {
    return (
      <Container>
        <AntdFormToolkits />
      </Container>
    );
  };

  ```

## preview
- https://afeiship.github.io/antd-form-toolkits/

## license
Code released under [the MIT license](https://github.com/afeiship/antd-form-toolkits/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/antd-form-toolkits
[version-url]: https://npmjs.org/package/@jswork/antd-form-toolkits

[license-image]: https://img.shields.io/npm/l/@jswork/antd-form-toolkits
[license-url]: https://github.com/afeiship/antd-form-toolkits/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/antd-form-toolkits
[size-url]: https://github.com/afeiship/antd-form-toolkits/blob/master/dist/antd-form-toolkits.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/antd-form-toolkits
[download-url]: https://www.npmjs.com/package/@jswork/antd-form-toolkits
