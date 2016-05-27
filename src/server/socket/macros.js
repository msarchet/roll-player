const MACRO_REGEX = /\{(.+?)\}/g;
const find = text => {
  return new Promise((resolve, reject) => {
    let matches = [];
    do {
      var matched = MACRO_REGEX.exec(text);
      if(matched) {
        matches.push(matched);
      }
    } while(matched)

    resolve(matches);
  });
}

const substitue = tokenized => {
  // here we want to loop through any found
  // macro tokens and call their associated operations
}

const main = {
  find
};

module.exports = main;
