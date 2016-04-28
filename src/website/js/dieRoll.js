import React from 'react';
import styles from '../css/roll.css';
const formatRoll = (roll) => {
  let maxValue = parseInt(roll.sides);
  return (<span className={styles.roll}>
    <span className={styles.dieInfo}>
      Rolled: {roll.number}d{roll.sides}
    </span>
    {roll.values.map(die => {
      let className = styles.dice;
      if(die.roll === maxValue) {
        className += ` ${styles['dice--crit']}`;
      } else if(die.roll === 1) {
        className += ` ${styles['dice--fail']}`;
      }
      return (
        <span className={className}>{die.roll}</span>
      )
    })}
  </span>);
}
const getDiceFromRoll = (roll) => {
  if(roll.originalRoll) {
    if(roll.modifier) {
      let leftDie = getDiceFromRoll(roll.originalRoll);
      let modifier = [];
      // if the modifier is a roll
      if(roll.modifier.isRoll != undefined) {
        modifier = getDiceFromRoll(roll.modifier);
      } else {
        modifier = [roll.modifier];
      }
      return (
        <span>
        {leftDie}
        {roll.operation}
        {modifier}
        </span>
      )
    }
    return getDiceFromRoll(roll.originalRoll);
  } else {
    if(roll.isRoll) {
      return [formatRoll(roll)];
    }
  }
}

const DieRoll = ({roll}) => {
  let dice = getDiceFromRoll(roll.result);
  
  return (
    <div className={styles.container}>
      <div className={styles.value}>
        {roll.value}
      </div>
      {dice}
    </div>)
}

export default DieRoll;
