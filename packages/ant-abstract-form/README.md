# ant-abstract-form
> For curd form based on react.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/ant-abstract-form
```

## usage
1. import css
  ```scss
  @import "~@jswork/ant-abstract-form/dist/style.css";

  // or use sass
  @import "~@jswork/ant-abstract-form/dist/style.scss";

  // customize your styles:
  $ant-abstract-form-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import AntAbstractForm from '@jswork/ant-abstract-form';
  import styled from 'styled-components';
  import nx from '@jswork/next';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
    .is-body {
      padding: 20px;
      background: #fff;
      width: 50%;
      min-width: 320px;
      margin: 0 auto;
    }

    .mr-5_ {
      > * {
        margin-right: 5px;
      }
    }

    .mr-10_ {
      > * {
        margin-right: 10px;
      }
    }
  `;

  // Mock api
  nx.$api = {
    curds_index: function () {
      return Promise.resolve('index');
    },
    curds_show: function () {
      return Promise.resolve('show');
    },
    curds_update: function () {
      return Promise.resolve('update');
    }
  };

  nx.$route = {
    back: function () {
      console.log('back');
    }
  };

  class App extends AntAbstractForm {
    apiService = nx.$api;
    routeService = nx.$route;

    constructor(props) {
      super(props);
      this.state = {
        meta: {
          formItemLayout: [6, 18],
          initialValues: {},
          fields: [
            {
              key: 'username',
              label: 'User Name',
              tooltip: '用户名',
              rules: [{ max: 10, min: 5 }]
            },
            { key: 'password', label: 'Password', widget: 'password' }
          ]
        }
      };
    }

    componentDidMount() {
      const { meta } = this.state;
      meta.initialValues = {
        username: 'afeiship'
      };
      this.setState({ meta });
    }

    render() {
      return this.view();
    }
  }

  export default () => {
    return (
      <Container>
        <App />
      </Container>
    );
  };

  ```

## preview
- https://afeiship.github.io/ant-abstract-form/

## license
Code released under [the MIT license](https://github.com/afeiship/ant-abstract-form/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/ant-abstract-form
[version-url]: https://npmjs.org/package/@jswork/ant-abstract-form

[license-image]: https://img.shields.io/npm/l/@jswork/ant-abstract-form
[license-url]: https://github.com/afeiship/ant-abstract-form/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/ant-abstract-form
[size-url]: https://github.com/afeiship/ant-abstract-form/blob/master/dist/ant-abstract-form.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/ant-abstract-form
[download-url]: https://www.npmjs.com/package/@jswork/ant-abstract-form
