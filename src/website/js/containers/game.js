import React from 'react';
import styles from '../../css/game.css';
import GameContent from './gameContent';

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <GameContent />
      </div>
    );
  }
}

export default Game
