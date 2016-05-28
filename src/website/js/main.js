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

render(
  <Provider store={store} id="derp">
    <App />
  </Provider>
, document.getElementById('main'));
