'use strict';
const roller = require('../../roller');
let commands = {
  'roll': (args, cb) => {
    roller.parse(args, (err, parsed) => {
      if(err) {
        cb(err);
        return;
      }
      roller.roll(parsed, (_err, result) => {
        if(_err) {
          cb(_err);
          return;
        }
        cb(null, {type: 'rolled', message: {result, value: result.value()}} );
        return;
      });
    })
  }
}

module.exports = (messageObj, cb) => {
  let message = messageObj.message;
  if(message.message[0] === '/') {
    let parts = message.message.split(' ');
    let command = parts[0].substring(1);
    let handler = commands[command];
    if(handler) {
      handler(parts[1], cb);
      return;
    } 
  }
  cb(null,{ message });
  return 
}
