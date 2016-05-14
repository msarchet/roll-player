import React from 'react';
import styles from '../../css/roll.css';

class Roll extends React.Component {
  constructor(props) {
    super(props);
  }

  formatRoll(roll) {
    let maxValue = parseInt(roll.sides);
    return (<span className={styles.roll}>
      <span className={styles.dieInfo}>
        <span className={styles.rollInput}>
          {roll.input}
        </span>
        ({roll.values.map((die, i) => {
          let className = styles.dice;
          if(die.isCrit) {
            className += ` ${styles['dice--crit']}`;
          } else if(die.isFail) {
            className += ` ${styles['dice--fail']}`;
          }
          let join = (i+1) === roll.values.length ? null : (<span>+</span>);
          return (
            <span>
              <span className={className}>{die.roll ? die.roll : die.values ? die.values[0].roll : '?'}</span>
              {join}
            </span>
          )
        })})
      </span>
    </span>);
  }

  getDiceFromRoll(roll) {
    switch(roll.type) {
      case 'keptDice':
      case 'rerollRoll':
        return [this.formatRoll(roll)];
      case 'modifiedRoll':
        let leftDie = this.getDiceFromRoll(roll.originalRoll);
        let modifier = [];
        // if the modifier is a roll
        if(roll.modifier.isRoll != undefined) {
          modifier = this.getDiceFromRoll(roll.modifier);
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
      default:
        return [this.formatRoll(roll)];
    }
  }

  render() {
    return (<span>{this.getDiceFromRoll(this.props.roll)}</span>); 
  }
}

export default Roll;
