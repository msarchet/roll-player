import React from 'react';
import {Link} from 'react-router';
import styles from '../../css/gameContent.css';
import CharacterSheet from './characterSheet';
import Chat from './chat';
import WindowManager from './windowManager';
import PaneModel from './paneModel';

class GameContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {panes: []};
  }

  componentWillMount() {
    let panes = [];

    let chatStyle = {
      right: 0,
      top: 0,
      height: '100%',
      width: '300px',
    }

    panes.push(new PaneModel({
      pane: {
          title: 'Chat',
          style: chatStyle,
          isPinned: true
      }, 
      content: (<Chat />)
    }));

    let welcomeStyle = {
      width: '400px',
      height: '250px', 
      top: '40px',
      left: '10px'
    }

    panes.push(new PaneModel({
      pane: {
        title: 'Roll Player',
        style: welcomeStyle
      }, 
      content: (
        <div>
          <span>Welcome to Roll Player! Feel free to poke around for a little bit and look at all of the things</span>
          <Link to={`/about`}>Learn More!</Link>
        </div>
      )}));
      this.setState({panes});
  }

  render() {
    return (
      <div className={styles.outerContainer}>
        <WindowManager ref='wm' defaultPanes={this.state.panes}/>
        <button className={styles.addPane} onClick={() => this.refs.wm.addPanes([new PaneModel({
            pane: {
              title: 'Character',
            },
            content: (<CharacterSheet />)
          })])}>
          Add Pane
        </button>
      </div>
    );
  }
}
export default GameContent;
