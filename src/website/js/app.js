import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import Chat from './containers/chat';
import Header from './containers/headers';
import Sockets from './containers/sockets';
import styles from '../css/demo.css';

const ChatComponent = () => (
  <Sockets>
    <div style={{flex: 1, flexDirection: 'column', display: 'flex'}}>
      <h1 className={styles.title}>Die Rolling Demo</h1>
      <Header />
      <Chat />
    </div>
  </Sockets>
)

const About = () => (
  <div>
    <a href="twitter.com/msarchet">@msarchet</a>
  </div>
)

const App = () => (
  <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
    <h1>Roll Player</h1>
    <Router history={browserHistory}>
      <Route path="/" component={ChatComponent} />
      <Route path="/about" component={About} />
    </Router>
  </div>
)

export default App
