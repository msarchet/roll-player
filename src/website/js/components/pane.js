import React from 'react';
import FontAwesome from 'react-fontawesome';
import Draggable from 'react-draggable';
import styles from '../../css/pane.css';

class Pane extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: true, 
      top: 0,
      left: 0,
      isActive: true,
      isFullscreen: this.props.fullscreen,
      isPinned: this.props.isPinned
    }
  }

  componentDidMount() {
    window.registerPane(this.props.paneName, this.paneRequested.bind(this)); 
  }

  componentWillUnmount() {
    window.unregisterPane(this.props.paneName);
  }

  paneRequested(name) {
    if(name === this.props.paneName) {
      this.setState({visible: true, isActive: true});
    } else {
      this.setState({isActive: false});
    }
  }

  requestPane(name) {
    window.openPane(name);
  }

  closePane() {
    this.setState({visible: false});
  }

  fullscreen() {
    this.setState({isFullscreen: true});
  }

  pinPane() {
    this.setState({isPinned: true});
  }

  unPinPane() {
    this.setState({isPinned: false});
  }

  togglePinned() {
    this.setState({isPinned: !this.state.isPinned});
  }

  render() {
    let {
      style,
      children,
      defaultPosition, 
      isFullscreen,
      closePane
    } = this.props;
    let {
      isPinned
    } = this.state;

    if(this.state.visible === false) {
      return false;
    }
    let className = styles.container;

    if(this.state.isActive) {
      if(this.state.isFullscreen) {
        className = styles.fullscreenActive;
      }
      className = styles.active;
    } else {
      if(this.state.isfullscreen) {
        className = styles.fullscreen;
      }
    }

    let handle = isPinned ? '' : '.handle';
    let resizeValue = isPinned ? 'none': 'both';
    style = style || {};
    style.resize = resizeValue;
    let pane = (
      <div 
        className={className} 
        style={style}
        onClick={() => this.requestPane(this.props.paneName)}>
        <div className={styles.header + ' handle'}>
          <div className={styles.title}>
            {this.props.title}
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button}
              onClick={this.togglePinned.bind(this)}>
              <FontAwesome name={isPinned ? 'reorder': 'thumb-tack'} />
            </button>
            <button 
              className={styles.button} 
              onClick={this.fullscreen.bind(this)}>
                <FontAwesome name='arrows-alt' />
            </button>
            <button 
              className={styles.button} 
              onClick={() => closePane(this.props.paneName)}>
                <FontAwesome name='close' />
            </button>
          </div>
        </div>
        {children} 
      </div>
    );

    if(isPinned) {
      return pane;
    }

    return (
      <Draggable 
        handle={handle} 
        bounds="body">
        {pane}
      </Draggable>
    )
  }
}

export default Pane;
