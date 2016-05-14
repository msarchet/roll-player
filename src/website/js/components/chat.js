import React from 'react';
import styles from '../../css/chat.css';
import ChatInput from '../containers/chatInput';
import ChatMessage from './chatMessage';

const Chat = ({chat, send}) => {
  let messages = chat.map(message => {return (<ChatMessage messageObj={message} />)}) 
  console.log(chat);
  return (
    <div>
      <h1>Chat Box</h1>
        {chat.length}
      <ul>
        {messages}
      </ul>
      <ChatInput onSubmit={send} />
    </div>
  )
}

export default Chat
