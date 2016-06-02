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
      dispatch({type: 'NEW_MESSAGE', message: payload});
    });

    this.socket.on('error', () => {
      dispatch({type: 'NEW_ALERT', message: 'There was an error with your last chat message'});
    });
  }

  componentWillUnmount() {
    console.log('unmounting sockets');
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        socket: this.socket
      });
    });

    return (<div>{children}</div>);
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Socket);
