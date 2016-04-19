'use strict';
const random = require('random-js');
const standard = /((\d*)d(\d+))(k(\d+))*([\+-]\d+)*/;
const engine = random.engines.mt19937().autoSeed();

let parse = (dieString, cb) => {
  if(standard.test(dieString)) {
    let result = standard.exec(dieString);
    let dice = makeDice(result);
    let keep = parseInt(result[5]);
    if(keep > dice.length) {
      return cb(new Error('trying to keep more dice than you are rolling'));
    }
    let modifier = checkModifier(result[6]);
    return cb(null, {dice, modifier, keep});
  }

  return cb(new Error('unable to parse input'));
}

let checkModifier = (mod) => {
  return parseInt(mod || 0);
};
let makeDice = (parsed) => {
  let count = parseInt(parsed[2] === '' ? '1' : parsed[1]);
  let die = parseInt(parsed[3]);
  let dice = [];
  for(var x = 0; x < count; x++) {
    dice.push({die: {sides: die}});
  }
  return dice;
}

let roll = (parsed, cb) => {
  let rolled = parsed.dice.map((dieObj) => {
    let die = dieObj.die;
    let value = random.die(die.sides)(engine);
    die.value = value;
    return {die};
  });

  parsed.dice = rolled;
  parsed.rolled = true;

  // reroll

  // keep|drop
  if(parsed.keep) {
    if(parsed.keep > parsed.dice.length) {
      return cb(new Error('Trying to keep more dice than rolled'));
    }
    parsed.kept = [];
    rolled = rolled.sort(function(a, b) {
      return a.die.value > b.die.value ? -1 : 1;
    });
    for(var x = 0; x < parsed.keep; x++) {
      parsed.kept.push(parsed.dice[x]);
    }
  }

  parsed.beforeModifier = sum(parsed.kept || parsed.dice);
  parsed.finalValue = parsed.beforeModifier + parsed.modifier;
  return cb(null, parsed);
}

let sum = (dice) => {
  return dice.reduce((i, dieObj) => {
    return i += dieObj.die.value;
  }, 0);
}

module.exports = {
  parse,
  roll
}
