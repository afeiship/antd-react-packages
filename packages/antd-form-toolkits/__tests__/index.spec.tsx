import * as React from 'react';
import { render } from '@testing-library/react';
import AntdFormToolkits from '../src/main';

describe('01/basic props', () => {
  test('<BoilerplateReactTsComponent /> set content to body should be worked', () => {
    render(<AntdFormToolkits />);
    console.log(document.body.innerHTML);
    expect(document.body.innerHTML.includes('Enjoy coding')).toBeTruthy();
  });
});
