import {connect} from 'react-redux';
import React from 'react';

class Socket extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.socket = io();
    let { dispatch } = this.props;
    this.socket.on('message', payload => {
      if(payload.type === 'message') {
        console.log('got a message');
        dispatch({type: 'NEW_MESSAGE', message: payload.message});
      }
    });
  }

  render() {
    return (this.props.children);
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Socket);
