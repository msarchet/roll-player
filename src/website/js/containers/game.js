import React from 'react';
import styles from '../../css/game.css';
import Header from './headers';
import Chat from './chat';

const sendEmail = () => {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Email',
    eventAction: 'clicked',
    eventLabel: 'Acquisition',
    transport: 'beacon'
  })
};
const Game = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Die Rolling Demo</h1>
    <div style={{display: 'inline-block'}}><span>Stay informed with an </span><a onClick={sendEmail} href="http://eepurl.com/b3ByN1">email</a></div>
    <p className={styles.helpText}> Mouse over results to see rolls</p>
    <Header />
    <Chat />
  </div>
);

export default Game
