'use strict';

let commands = {
  'roll': message => {
    return {type: 'rolled', message: message.message};
  }
}

module.exports = (message, cb) => {
  if(message.message[0] === '/') {
    let command = message.message.split(' ')[0].substring(1);
    let handler = commands[command];
    if(handler) {
      cb(null, handler());
      return;
    } 
  }
  cb(null, message.message);
  return 
}
