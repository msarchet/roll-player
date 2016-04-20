export class MessageHandlers {
  constructor() {
    this.chat = message => {
      return message.message;
    } 
  }
}
