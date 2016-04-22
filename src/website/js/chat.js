import React from 'react';
import styles from '../css/chat.css';
import ChatInput from './containers/chatInput';
const Chat = ({chat, send}) => {
  let messages = chat.map(message => { 
    console.log(message);
    return (<li>{message.message}</li>)
  });
  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {messages}
      </ul>
      <ChatInput onSubmit={send} />
    </div>
  )
}

export default Chat
