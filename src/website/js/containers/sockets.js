import React from 'react';
import {getSocket} from '../sockets';

class Socket extends React.Component {
  constructor(props) {
    super(props);
    this.socket = getSocket();
  }

  componentWillUnmount() {
    this.socket.off();
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


export default Socket;
