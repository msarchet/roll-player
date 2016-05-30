import React from 'react';
import styles from '../../css/gameContent.css';
import {Link} from 'react-router';
import CharacterSheet from './characterSheet';
const GameContent = () => (
  <div className={styles.outerContainer}>
    Here be dragons!
    <Link to={`/about`}>What is this?</Link>
  </div>
);

export default GameContent;
