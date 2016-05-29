import React from 'react';

import styles from '../../css/chat.css';
import DieRoll from './dieRoll';
const ChatMessage = ({count, messageObj}) => {
  let messageType = messageObj.type;
  let message = messageObj.message; 
  if(messageType === 'chat') {
      return(
        <div className={styles.container} key={count}>
          <div className={styles.plainChat}>{message.message}</div>
        </div>
      );
  } else if(messageType === 'rolled') {
    return (
      <div className={styles.container} key={count}>
        <DieRoll className={styles.dieRoll} roll={message} />
      </div>
    ) 
  } else {
      return(
        <div className={styles.container} key={count}>
          <div className={styles.plainChat}>{message.message}</div>
        </div>
      );
  }
}

export default ChatMessage;
