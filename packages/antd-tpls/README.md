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
  import AntdTpls from '@jswork/antd-tpls';
  import styled from 'styled-components';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
  `;

  export default (props: any) => {
    return (
      <Container>
        <AntdTpls />
      </Container>
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
