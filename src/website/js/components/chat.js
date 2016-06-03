import React from 'react';
import styles from '../../css/chat.css';
import ChatInput from '../containers/chatInput';
import ChatMessage from './chatMessage';
import trackEvent from '../containers/trackEvent';
const chatWelcome = [
  {
    type: 'system', 
    message: {message :'Welcome to Roll Player App! You can try rolling some dice if you want, or you can go to the about page if you want to learn some more!' }
  },
  {
    type: 'system', 
    message: {message: 'Thanks for coming and checking this out!' }
  }
];

class Chat extends React.Component {
    constructor(props) {
      super(props);
      this.state = {chat: chatWelcome}
    }

    componentDidMount() {
      this.props.socket.on('message', payload => {
        this.setState({chat: this.state.chat.concat([payload])})
      });

      this.props.socket.on('error', () => {
      });
    }

    send(message) {
      this.props.socket.emit('message', {type: 'chat', message});
      trackEvent({
        category: 'roll', 
        action: 'clicked',
        label: 'engagement'
      });
    }

    render() {
      let messages = this.state.chat.map(message => {
        return (<ChatMessage key={Math.random().toString()} messageObj={message} />)
      });
      return (
        <div className={styles.outerContainer}>
          <div className={styles.messages}>
            {messages}
          </div>
          <div className={styles.inputContainer}>
            <ChatInput onSubmit={this.send.bind(this)} />
          </div>
        </div>
    )
  }
}
export default Chat
