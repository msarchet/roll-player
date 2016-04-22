import React from 'react';
import Chat from './containers/chat';
import Sockets from './containers/sockets';
const App = () => (
  <Sockets>
    <Chat />
  </Sockets>
)

export default App
