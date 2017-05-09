import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';



import firebaseApp from 'firebase-app';

import store from 'modules';
import { Provider } from 'react-redux';

import notify from 'lib/notify';

window.notify = notify;


firebaseApp.initialize(store);

window.firebaseApp = firebaseApp;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


