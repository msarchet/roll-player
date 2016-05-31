import React from 'react';
import {Link} from 'react-router';
import {filter} from 'lodash';

import styles from '../../css/gameContent.css';
import CharacterSheet from './characterSheet';
import Pane from '../components/pane';
import Chat from './chat';
class GameContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {panes : []}
  }

  getPaneId() {
    return Math.random().toString();
  }
  addPanes(panes) {
      this.setState({
        panes: this.state.panes.concat(panes)    
      });
  }

  renderPanes() {
    return this.state.panes.map(paneObj => (
        <Pane paneName={paneObj.paneId} 
          {...paneObj.pane} 
          closePane={this.closePane.bind(this)}>
          {paneObj.content}
        </Pane>
      ));
  }


  closePane(paneName) {
    // remove the pane from the list of panes
    this.setState({
      panes: filter(this.state.panes, p => p.paneId !== paneName)
    });
  }

  componentWillMount() {
    let panes = [];
    let chatStyle = {
      right: 0,
      top: 0,
      height: '100%',
      width: '300px',
    }

    panes.push({
      pane: {
          title: 'Chat',
          style: chatStyle,
          isPinned: true,
          fullscreen: true
      }, 
      paneId: this.getPaneId(),
      content: (<Chat />)
    });

    let welcomeStyle = {
      width: '400px',
      height: '250px', 
    }

    panes.push({
      pane: {
        title: 'Roll Player',
        style: welcomeStyle
      }, 
      paneId: this.getPaneId(),
      content: (
        <div>
          <span>Welcome to Roll Player! Feel free to poke around for a little bit and look at all of the things</span>
        
          <Link to={`/about`}>Learn More!</Link>
        </div>
      )});
      this.addPanes(panes);
  }

  render() {
    return (
      <div className={styles.outerContainer}>
        {this.renderPanes()}
        <button className={styles.addPane} onClick={() => this.addPanes([{pane: {title: 'Character'},content: (<CharacterSheet />)}])}>
          Add Pane
        </button>
      </div>
    );
  }
}
export default GameContent;
