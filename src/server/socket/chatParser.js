'use strict';
const commands = require('./commands');
const macros = require('./macros');
module.exports = messageObj => {
  return new Promise((resolve, reject) => {
    console.log(messageObj);
    let message = messageObj.message;
    // does this contain a macro
    macros.find(message.message).then(matched => {
      console.log('matched', matched);
    }).catch(err => {
      console.error('error matching regex', err);
    });
    // is this a command
    if(message.message[0] === '/') {
      let parts = message.message.split(' ');
      let command = parts[0].substring(1);
      let handler = commands[command];
      if(handler) {
        handler(parts[1])
          .then(result => resolve(result))
          .catch(reject);
        return;
      } 
    }

    resolve({ message });
  });
}
