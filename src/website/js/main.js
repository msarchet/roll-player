import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

import rollPlayApp from './reducers';
import {reducer as formReducer} from 'redux-form';
import App from './app';

let store = createStore(combineReducers({
  form: formReducer,
  rollPlayApp
}));

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
  <Provider store={store} style={{border: '1px'}}>
    <App />
  </Provider>
, document.getElementById('main'));
