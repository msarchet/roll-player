import React from 'react';
import {getSocket} from '../sockets';
import styles from '../../css/characterSheet.css';

const Skill = ({skill}) => (
  <div>
    {JSON.stringify(skill)}
  </div>  
);

class CharacterSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: true, characterData: null}
  }

  componentDidMount() {
    this.socket = getSocket();
    this.socket.on('character_data', characterData => {
      this.setState({characterData})
    })
    this.socket.emit('get_character', {id: this.props.id});
  }

  render() {
    if(this.state.characterData == null) {
      return (<div></div>)
    }
    let {stats, name, skills} = this.state.characterData;

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
