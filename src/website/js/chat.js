import React from 'react';
import styles from '../css/chat.css';

export class Chat extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(<h2 className={styles.chat}> Chat </h2>)
  }
}
