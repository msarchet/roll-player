import React from 'react';
import styles from '../../css/game.css';
import Header from './headers';
import Chat from './chat';
import CharacterSheet from './CharacterSheet';
import GameContent from './gameContent';
import Pane from '../components/pane';

const Game = () => (
  <div className={styles.container}>
    <GameContent />
    <Chat />
    <Pane paneName={'characterSheet'}>
      <CharacterSheet />
    </Pane>
  </div>
);

export default Game
