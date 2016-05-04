import React from 'react';
import styles from '../css/roll.css';

class Roll extends React.Component {
  constructor(props) {
    super(props);
  }

  formatRoll(roll) {
    let maxValue = parseInt(roll.sides);
    return (<span className={styles.roll}>
      <span className={styles.dieInfo}>
        Rolled: {roll.number}d{roll.sides}
        <span>{roll.values.map(die => {
          let className = styles.dice;
          if(die.isCrit) {
            className += ` ${styles['dice--crit']}`;
          } else if(die.isFail) {
            className += ` ${styles['dice--fail']}`;
          }
          return (
            <span className={className}>{die.roll}</span>
          )
        })}</span>
      </span>
    </span>);
  }

  getDiceFromRoll(roll) {
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
      return this.getDiceFromRoll(roll.originalRoll);
    } else {
      if(roll.isRoll) {
        return [this.formatRoll(roll)];
      }
    }
  }

  render() {
    return (<span>{this.getDiceFromRoll(this.props.roll)}</span>); 
  }
}

export default Roll;
