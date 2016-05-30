import React from 'react';
import styles from '../../css/pane.css';
import FontAwesome from 'react-fontawesome';
import Draggable from 'react-draggable';
class Pane extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false, 
      top: 0,
      left: 0,
    }
  }

  componentDidMount() {
    window.registerPane(this.props.paneName, this.paneRequested.bind(this)); 
  }

  componentWillUnmount() {
    window.unregisterPane(this.props.paneName);
  }

  paneRequested() {
    this.setState({visible: true});
  }

  closePane() {
    this.setState({visible: false});
  }

  render() {
    let {children} = this.props;
    if(this.state.visible === false) {
      return false;
    }

    return (
      <Draggable handle={'.' + styles.header} defaultPosition={{x: 25, y: 25}} bounds={document.body.style}>
        <div className={styles.container}>
          <div className={styles.header}>
            <button onClick={this.closePane.bind(this)}><FontAwesome name='close' /></button>
          </div>
          {children} 
        </div>
      </Draggable>
    )
  }
}

export default Pane;

