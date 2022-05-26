import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
