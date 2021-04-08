import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './components/App.jsx';

import WebFont from 'webfontloader';
WebFont.load({
  google: {
    families: ['Teko:400,700']
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
