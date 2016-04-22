import {MessageHandlers} from './messageHandlers';
export class ChatHandler {
  constructor() {
    this.socket = io();
  }

  listen() {
    this.socket.on('message', this.parseMessage);
  }

  parseMessage (message) {
    let messageType = message.type;
    let handler = messageHandlers[messageType];
    let parsed = handler(message);
  }

}
