import React from 'react';

import styles from '../../css/chat.css';
import DieRoll from './dieRoll';
const ChatMessage = ({messageObj}) => {
  let messageType = messageObj.type;
  let message = messageObj.message; 
  if(messageType === 'chat') {
      return(
        <div className={styles.container}>
          <div className={styles.plainChat}>{message.message}</div>
        </div>
      );
  } if(messageType === 'rolled') {
    return (<DieRoll className={styles.dieRoll} roll={message} />) 
  }else {
      return(
        <div className={styles.container}>
          <div className={styles.plainChat}>{JSON.stringify(message.message, null, 2)}</div>
        </div>
      );
  }
}

export default ChatMessage;
