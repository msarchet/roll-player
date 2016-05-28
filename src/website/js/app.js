import React from 'react';
import Chat from './containers/chat';
import Header from './containers/headers';
import Sockets from './containers/sockets';
import styles from '../css/demo.css';
const App = () => (
  <Sockets>
    <div>
      <h1 className={styles.title}>Die Rolling Demo</h1>
      <Header />
      <Chat />
    </div>
  </Sockets>
)

export default App
