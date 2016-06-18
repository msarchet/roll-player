'use strict';
const random = require('random-js');
const engine = random.engines.mt19937().autoSeed();

const createDie = (number, sides) => {
  number = +number || 1;
  sides = +sides;
  let values = random.dice(sides, number)(engine).map(r => {
    return {roll: r, isCrit: r === sides, isFail: r === 1, sides}
  });
  return {
    type: 'roll',
    isRoll: true,
    number,
    sides,
    values, 
    input: `${number}d${sides}`,
    value: () => sum(values)
  }
}

const createKeep = (roll, keep) => {
  let sorted =  roll.values.sort((a,b) => {
    return a.roll > b.roll ? -1 : 1; 
  });
  let values = sorted.slice(0, keep);
  let dropped = sorted.slice(keep);
  return {
    type: 'keptDice',
    isRoll: true,
    number: keep,
    sides: roll.sides,
    values,
    dropped,
    originalRoll: roll,
    input: `${roll.input}k${keep}`,
    value: () => sum(values) 
  }
}

const createMath = (roll, modifier, operation) => {
  let input = `${roll.input}${operation}${modifier.isRoll ? modifier.input : modifier}`
  return {
    type: 'modifiedRoll',
    isRoll: false,
    number: roll.length,
    modifier: modifier,
    operation: operation,
    originalRoll: roll,
    input,
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

  // we should check if the reroll value is wholy inclusive of all die sides
  // 1d1r1 would roll forever, so we should just bail out
  // 1d1ro1 is fine, since we only ever reroll once
  let targets = roll.targets || [];
  targets.push(target);
  let values = [];
  if(token == 'ro') {
    values = roll.values.map((value) => {
      if(shouldReroll(value.roll, target, token)) {
        let newRoll = createDie(1, roll.sides);
        newRoll.original = value;
        newRoll.rerollCount = 1;
        return newRoll;
      }

      return value;
    });
  } else if(token == 'r<' || token == 'r>' || token == 'r') {
    values = roll.values.map((value) => {
      let newRoll = null;
      let rerollCount = value.rerollCount || 0;
      let checkValue = (newRoll && newRoll.value()) || value.roll;
      while(shouldReroll(checkValue, target, token) && rerollCount < 100) {
        newRoll = createDie(1, roll.sides);
        checkValue = newRoll.value();
        rerollCount++;
      }
      if(rerollCount > 0) {
        if(rerollCount === 100) {
          // we don't want to roll forever, but it's possible with someone rolling 1d1r1 or similar
        }
        newRoll.original = value;
        newRoll.rerollCount = rerollCount;
        return newRoll;
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
    input: `${roll.input}${token}${target}`,
    number: roll.number,
    sides: roll.sides,
    value: () => values.reduce((total, die) => {
      if(die.roll) {
        return total += die.roll;
      } 
      if(die.isRoll) {
        return total += die.values.reduce((subtotal, die) => {
          return subtotal += die.roll;
        }, 0);
      }
    }, 0)
  }
}
const operatorTable = {
  'd' : {precedence: 0, operation: createDie, args: 2},
  'k' : {precedence: 0, operation: createKeep, args: 2},
  'r' : {precedence: 0, operation: reroll, args: 2}, 
  'ro': {precedence: 0, operation: reroll, args: 2},
  'r<': {precedence: 0, operation: reroll, args: 2},
  'r>': {precedence: 0, operation: reroll, args: 2},
  '+' : {precedence: 1, operation: createMath, args: 2},
  '-' : {precedence: 1, operators: createMath, args: 2}
}

const parse = (roll) => {
  return new Promise((resolve, reject) => {
    // this currently requires two passes over the input
    // for now this is fine. Since most commands are small
    // this should be optimized at some point
    let tokenized = roll.split('');
    let index = 0;
    let joined = [];

    let collected = [];

    while(index < tokenized.length) {
      if(!isOperator(tokenized[index])) {
        collected.push(tokenized[index]);
      } else {
        if(collected.length > 0) {
          let join = collected.join('');
          collected = [];
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
    if(collected.length > 0) {
      let join = collected.join('');
      collected = [];
      joined.push(join);
    }

    tokenized = joined;
    let token = null; 
    let output = [];
    let operators = [];
    // start construction of the tree
    while(token = tokenized.shift()) {
      if(isOperator(token)) {

        // this really should move all lower precendece operators off the stack
        // this isn't a problem since we have no grouping operations
        let top = operators[operators.length - 1];
        if(top != null && operatorTable[top].precedence <= operatorTable[token].precedence) {
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

    resolve(output);
  });
}

const roll = (rpn) => {
  let value = evaluate(rpn);
  return new Promise((resolve, reject) => {
    resolve(value);
  });  

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

  // currently all operations take 2 arguments
  // it's possible that we have an operation that takes
  // more than two arguments, but right now we do not
  // 2d6 -> 2 6 d
  let left = rpn[index - 2];
  let right = rpn[index - 1];
  let value = null;
  switch(token) {
    case 'd':
      if(left && left.value) {
        left = left.value();
      }
      if(right && right.value) {
        right = right.value();
      }
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

const isOperator = token => {
  return Object.keys(operatorTable).indexOf(token) !== -1
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
