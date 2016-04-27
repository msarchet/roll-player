'use strict';
const messageTypes = require('./messageTypes');
const chatParser = require('./chatParser');

const parse = (message, cb) => {
  // handle if the message is a command
  console.log('message type', message.type);
  if(message.type === messageTypes.CHAT) {
    chatParser(message, cb);
  }
}

module.exports = {parse}
