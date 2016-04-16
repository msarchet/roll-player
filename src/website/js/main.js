let React = require('react');
let ReactDOM = require('react-dom');
import {ChatHandler} from './chatHandler';

import {Chat} from './chat';
window.handler = ChatHandler;
ReactDOM.render(<Chat />, document.body);
