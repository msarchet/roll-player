import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

import App from './app';

let panes = {};

window.openPane = name => {
  Object.keys(panes).forEach(function(key,index) {
    panes[key](name);
  });
}

window.registerPane = (name, callback) => {
  panes[name] = callback;
}

window.unregisterPane = (name) => {
  delete panes[name];
}

render(
  <App />
, document.getElementById('main'));
