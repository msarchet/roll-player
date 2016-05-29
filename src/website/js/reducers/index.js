import {combineReducers} from 'redux';

import chat from './chat';
import alert from './alert';

const app = combineReducers({
  chat,
  alert
})

export default app
