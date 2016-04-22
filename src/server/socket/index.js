'use strict';
const messageTypes = require('./messageTypes');
const chatParser = require('./chatParser');

const parser = (message, cb) => {
  // handle if the message is a command
  if(message.type === messageTypes.CHAT) {
    chatParser(message, cb);
  }
}
