const roller = require('../../roller');
const commands = {
  roll: (args) => {
    return new Promise((resolve, reject) => {
      roller.parse(args).then(parsed => {
        return roller.roll(parsed).then((result) => {
          resolve({type: 'rolled', message: {result, value: result.value()}});
        });
      }).catch(reject);
    });
  }
}

module.exports = commands;
