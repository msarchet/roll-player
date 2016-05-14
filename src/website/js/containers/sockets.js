import {connect} from 'react-redux';
import React from 'react';
import {getSocket} from '../sockets';
class Socket extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.socket = getSocket();
    let { dispatch } = this.props;
    this.socket.on('message', payload => {
      console.log('got message', payload);
      dispatch({type: 'NEW_MESSAGE', message: payload});
    });
  }

  componentWillUnmount() {
    console.log('unmounting sockets');
  }

  render() {
    return (this.props.children);
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Socket);
