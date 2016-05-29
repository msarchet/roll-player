'use strict';
const messageTypes = require('./messageTypes');
const chatParser = require('./chatParser');

const parse = (message, cb) => {
  // handle if the message is a chat message
  return new Promise((resolve, reject) => {
    if(message.type === messageTypes.CHAT) {
      chatParser(message).then(result => {
        resolve(result);
      }).catch(reject);
    }
  });
}

module.exports = {parse}
