const R = require('ramda'),
  operators = require('./operators');

const indexedOperators = R.indexBy(R.prop('symbol'), operators);

const parseOperator = exp => indexedOperators[exp[0]];

const parsePropertyName = exp => {
  if(parseOperator(exp).type !== 'comparison'){
    throw `Error parsing expression. Property name arguments only exist on comparison expressions. ${JSON.stringify(exp)}`;
  }

  return exp[1];
};

module.exports = {
  parseOperator,
  parsePropertyName,

  // Aliases
  op: parseOperator,
  prop: parsePropertyName
};
