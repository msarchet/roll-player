import React from 'react';
import styles from '../../css/chat.css';
import ChatInput from '../containers/chatInput';
import ChatMessage from './chatMessage';

const Chat = ({chat, send}) => {
  let messages = chat.map(message => {return (<ChatMessage messageObj={message} />)}) 
  return (
    <div className={styles.outerContainer}>
      <ul className={styles.messages}>
        {messages}
      </ul>
      <div className={styles.inputContainer}>
        <ChatInput onSubmit={send} />
        <button onClick={send}>Send</button>
      </div>
    </div>
  )
}

export default Chat
