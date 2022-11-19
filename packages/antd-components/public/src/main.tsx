import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
// antd < 5.0.0
// import 'antd/dist/antd.css';
import '../../src/style.scss';
import App from './app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
