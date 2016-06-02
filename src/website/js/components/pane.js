import React from 'react';
import FontAwesome from 'react-fontawesome';
import Draggable from 'react-draggable';
import styles from '../../css/pane.css';
import ResizableAndMovable from 'react-resizable-and-movable';

class Pane extends React.Component {
  constructor(props){
    super(props);
    let {style} = this.props;
    let size = {
      width: style.width ? parseInt(style.width) : 400,
      height: style.height ? parseInt(style.height) : 400
    }

    this.state = {
      visible: true, 
      isActive: true,
      isFullscreen: this.props.fullscreen,
      isPinned: this.props.isPinned,
      position: {x: 0, y: 0},
      size
    }
  }

  resize() {
    if(this.props.isDocked) {
      if(this.props.dock === 'right') {
        this.adjustPosition();
      }
    }
  }

  adjustPosition() {
    let {isDocked, dock, docked} = this.props;

    let position = Object.assign({}, this.state.position);
    let size = Object.assign({}, this.state.size);

    if(isDocked) {
      if(docked === 'right') {
        let left = document.body.clientWidth - size.width;
        position.x = left;
        size.height = document.body.clientHeight;
      }
    }

    this.setState({position, size});
  }

  componentDidMount() {
    window.registerPane(this.props.paneName, this.paneRequested.bind(this)); 
    this.adjustPosition();
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
      closePane,
      isDocked,
      docked
    } = this.props;
    let {
      isPinned
    } = this.state;

    if(this.state.visible === false) {
      return false;
    }

    let className = styles.container;
    if(this.state.isActive) {
      className = styles.active;
    } 
    let handle = '.handle';
    let paneStyle = {width: '100%', height: '100%'};
    let pane = (
      <div 
        className={className} 
        style={paneStyle}
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
        <div style={{width: '100%', height: '100%', pointer: 'default'}}>
          {children} 
        </div>
      </div>
    );

    return (
      <ResizableAndMovable
        moveAxis={isPinned ? 'none' : 'both'}
        {...this.state.size}
        {...this.state.position}
        dragHandlerClassName={handle}>
        {pane}
      </ResizableAndMovable>
    )
  }
}

export default Pane;

