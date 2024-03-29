# antd-components
> Antd wrapped components.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/antd-components
```

## usage
1. import css
  ```scss
  @import "~@jswork/antd-components/dist/style.css";

  // or use sass
  @import "~@jswork/antd-components/dist/style.scss";

  // customize your styles:
  $antd-components-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import AntdComponents from '@jswork/antd-components';
  import styled from 'styled-components';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
  `;

  export default (props: any) => {
    return (
      <Container>
        <AntdComponents />
      </Container>
    );
  };

  ```

## preview
- https://afeiship.github.io/antd-components/

## license
Code released under [the MIT license](https://github.com/afeiship/antd-components/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/antd-components
[version-url]: https://npmjs.org/package/@jswork/antd-components

[license-image]: https://img.shields.io/npm/l/@jswork/antd-components
[license-url]: https://github.com/afeiship/antd-components/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/antd-components
[size-url]: https://github.com/afeiship/antd-components/blob/master/dist/antd-components.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/antd-components
[download-url]: https://www.npmjs.com/package/@jswork/antd-components
