'use strict';
const random = require('random-js');
const engine = random.engines.mt19937().autoSeed();
const operatorPrecedence = {
  'd': 0,
  'k': 0,
  'r': 0, 
  'ro': 0,
  'r<': 0,
  'r>': 0,
  '+': 1,
  '-': 1
}

const parse = (roll, callback) => {
  let tokenized = roll.split('');
  // rejoin numbers
  let index = 0;
  let joined = [];
  let current = [];
  while(index < tokenized.length) {
    if(!isOperator(tokenized[index])) {
      current.push(tokenized[index]);
    } else {
      if(current.length > 0) {
        let join = current.join('');
        current = [];
        joined.push(join);
      }
      let token = tokenized[index];
      if(token == 'r') {
        let next = tokenized[index + 1];
        if(next == 'o' || next == '<' || next == '>') {
          token += next;
          index++;
        }
      }
      joined.push(token);
    }
    index++;
  }
  if(current.length > 0) {
    let join = current.join('');
    current = [];
    joined.push(join);
  }
  tokenized = joined;
  let token = null; 
  let output = [];
  let operators = [];
  // start construction of the tree
  while(token = tokenized.shift()) {
    if(isOperator(token)) {
      let top = operators[operators.length - 1];
      if(top != null && operatorPrecedence[top] <= operatorPrecedence[token]) {
        output.push(operators.pop());
      }
      operators.push(token);
      output.push(tokenized.shift() || 1);
    } else {
      output.push(token);
    }
  }

  while(token = operators.pop()) {
    output.push(token);
  }
  
  callback(null, output);
}

const roll = (rpn, callback) => {
  let value = evaluate(rpn);
  callback(null, value);
};

const evaluate = rpn => {
  let operator = null;
  let index = 0; 
  let token = rpn[index];
  while(!isOperator(token)) {
    index++; 
    token = rpn[index];
    if(token == undefined) {
      break;
    }
  }

  let left = rpn[index - 2];
  let right = rpn[index - 1];
  let value = null;
  switch(token) {
    case 'd':
      value = createDie(left, right);
      break;
    case 'k':
      value = createKeep(left, right);
      break;
    case '+':
    case '-':
      value = createMath(left, right, token);
      break;
    case 'r':
    case 'r<':
    case 'r>':
    case 'ro':
      value = reroll(left, right, token);
      break;
  }

  let start = index - 2;
  start = start < 0 ? 0 : start;
  let countToRemove = index - start + 1;
  rpn.splice(start, countToRemove, value);
  if(rpn.length > 1) {
    return evaluate(rpn);
  } else {
    return rpn[0];
  }
}

const sum = values => {
  return values.reduce((i, v) => i += v.roll, 0);
}

const createDie = (number, sides) => {
  number = number || 1;
  let values = random.dice(sides, number)(engine).map(r => {
    return {roll: r}
  });
  return {
    type: 'roll',
    isRoll: true,
    number,
    sides,
    values, 
    value: () => sum(values)
  }
}

const createKeep = (roll, keep) => {
  let values = roll.values.sort((a,b) => {
    return a.roll > b.roll ? -1 : 1; 
  }).slice(0, keep);
  return {
    type: 'keptDice',
    isRoll: true,
    number: keep,
    values,
    originalRoll: roll,
    value: () => sum(values) 
  }
}

const createMath = (roll, modifier, operation) => {
  return {
    type: 'modifiedRoll',
    isRoll: false,
    number: roll.length,
    modifier: modifier,
    operation: operation,
    originalRoll: roll,
    value: () => {
      let modifierValue = modifier.value ? modifier.value() : parseInt(modifier);
      if(operation == '+') {
        return roll.value() + modifierValue;
      } else if(operation == '-'){
        return roll.value() - modifierValue;
      }
    }
  }
}
const shouldReroll = (value, target, type) => {
  switch(type) {
    case 'ro': 
    case 'r':
      return value == target;
    case 'r<':
      return value <= target;
    case 'r>':
      return value >= target;
  }
}
const reroll = (roll, target, token) => {
  if(!roll.isRoll) {
    throw new Error('Can\'t reroll a non-roll');
  }

  let targets = roll.targets || [];
  targets.push(target);
  let values = [];
  if(token == 'ro') {
    values = roll.values.map((value) => {
      if(shouldReroll(value.roll, target, token)) {
        let newRoll = random.die(roll.sides)(engine);
        return {roll: newRoll, original: value, rerollCount: 1}; 
      }

      return value;
    });
  } else if(token == 'r<' || token == 'r>' || token == 'r') {
    values = roll.values.map((value) => {
      let newRoll = 0;
      let rerollCount = value.rerollCount || 0;
      while(shouldReroll(newRoll || value.roll, target, token) && rerollCount < 100) {
        newRoll = random.die(roll.sides)(engine);
        rerollCount++;
      }
      if(rerollCount > 0) {
        if(rerollCount === 100) {

        }
        return {roll: newRoll, original: value, rerollCount}; 
      }
      return value;
    });
  }
  return {
    type: 'rerollRoll',
    isRoll: true,
    originalRoll: roll,
    targets,
    values,
    number: roll.number,
    sides: roll.sides,
    value: () => sum(values)
  }
}

const isOperator = token => {
  return Object.keys(operatorPrecedence).indexOf(token) !== -1
}

module.exports = {
  parse,
  roll,
  sum,
  reroll,
  createDie,
  createKeep,
  createMath,
  shouldReroll
}
