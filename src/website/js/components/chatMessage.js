import React from 'react';

import styles from '../../css/chat.css';
import DieRoll from './dieRoll';
const ChatMessage = ({count, messageObj}) => {
  let messageType = messageObj.type;
  let message = messageObj.message; 
  let messageContent = null;
  if(messageType === 'chat') {
    messageContent = (<div className={styles.plainChat}>{message.message}</div>)
  } else if(messageType === 'rolled') {
    messageContent = (<DieRoll className={styles.dieRoll} roll={message} />) 
  } else if(messageType === 'system') {
    messageContent = (
      <div className = {styles.system}>{message.message}</div>
    )
  } else {
      messageContent = (
          <div className={styles.plainChat}>{message.message}</div>
      );
  }
  console.log('message content', messageContent);

  return (
    <div className={styles.container} key={count}>
      {messageContent}
    </div>
  )
}

export default ChatMessage;
