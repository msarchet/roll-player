import React from 'react';
import styles from '../../css/chat.css';
import ChatInput from '../containers/chatInput';
import ChatMessage from './chatMessage';
const chatWelcome = [
  {
    type: 'system', 
    message: {message :'Welcome to Roll Player App! You can try rolling some dice if you want, or you can go to the about page if you want to learn some more!' }
  },
  {
    type: 'system', 
    message: {message: 'Thanks for coming and checking this out!' }
  }
];
const Chat = ({chat, send}) => {
  let count = 0;
  chat = chatWelcome.concat(chat);
  console.log(chat);
  let messages = chat.map(message => {
    count++;
    return (<ChatMessage key={count} messageObj={message} />)
  });
  return (
    <div className={styles.outerContainer}>
      <div className={styles.messages}>
        {messages}
      </div>
      <div className={styles.inputContainer}>
        <ChatInput onSubmit={send} />
      </div>
    </div>
  )
}

export default Chat
