import React from 'react';
import styles from '../css/roll.css';
import Roll from './roll';

class DieRoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hover: false};
  }

  onMouseOver() {
    this.setState({hover:true});
  }
  onMouseOut() {
    this.setState({hover:false});
  }

  render() {
    let {roll} = this.props;
    return (
      <div className={styles.container} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)}>
        <div className={styles.value}>
          {roll.value}
        </div>
        <div  className={this.state.hover ? styles['result--hover'] : styles.result}>
          <Roll roll={roll.result}/>
        </div>
      </div>)
  }
}

export default DieRoll;
