import React from 'react';
import styles from '../../css/game.css';
import Header from './headers';
import Chat from './chat';
import GameContent from './gameContent';

import trackEvent from './trackEvent';

const sendEmail = () => {
  trackEvent({
    category: 'email',
    action: 'click',
    label: 'acquisition'
  });
}

const Game = () => (
  <div className={styles.container}>
    <GameContent />
    <Chat />
  </div>
);

export default Game
