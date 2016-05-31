import React from 'react';
import FontAwesome from 'react-fontawesome';

import {getSocket} from '../sockets';
import styles from '../../css/characterSheet.css';
import Skill from './CharacterSheet/skill';

class CharacterSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: true, characterData: null, fetchingData: true}
  }

  componentDidMount() {
    this.socket = getSocket();
    this.socket.on('character_data', characterData => {
      this.setState({characterData, fetchingData: false})
    })
    this.socket.emit('get_character', {id: this.props.characterId});
    this.setState({fetchingData: true});
  }

  componentWillUnmount() {
    this.socket.removeAllListeners('character_data');
    this.socket = null;
  }

  render() {
    if(this.state.fetchingData) {
      return (
        <div className={styles.container}>
          <FontAwesome name='spinner' size={'2x'} style={{paddingRight: '5px'}}/>Fetching Character Data...
        </div>
      )
    }
    let {stats, name, skills} = this.state.characterData;

    return (
      <div className={styles.container}>
        <div className={styles.characterName}>{name}</div>
        In progress!
      </div>
    )
    return (
      <div className={styles.container}>
        <div className={styles.characterName}>{name}</div>
        <div className={styles.skills}>{skills.map(skill => (<Skill skill={skill} />))}</div>
        <div className={styles.stats}>{JSON.stringify(stats)}</div>
      </div>
    )
  }
}
export default CharacterSheet;
