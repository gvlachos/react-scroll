import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  import('react-axe').then(axe => {
    if (axe && axe.default && typeof (axe.default) === 'function') {
      axe.default(React, ReactDOM, 1000);
    }
    ReactDOM.render(<App />, document.getElementById('root'));
  });
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}
