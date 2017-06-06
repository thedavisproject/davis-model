const opToFn = op => (...args) => [op, ...args];

const equals             = opToFn('=');
const notEquals          = opToFn('!=');
const lessThan           = opToFn('<');
const lessThanOrEqual    = opToFn('<=');
const greaterThan        = opToFn('>');
const greaterThanOrEqual = opToFn('>=');
const like               = opToFn('like');
const isIn               = opToFn('in');
const isNotIn            = opToFn('notin');
const and                = opToFn('and');
const or                 = opToFn('or');
const not                = opToFn('not');
const nor                = opToFn('nor');

module.exports = {
  equals,
  notEquals,
  lessThan,
  lessThanOrEqual,
  greaterThan,
  greaterThanOrEqual,
  like,
  isIn,
  isNotIn,
  and,
  or,
  not,
  nor,

  // Aliases
  eq:  equals,
  neq: notEquals,
  lt:  lessThan,
  lte: lessThanOrEqual,
  gt:  greaterThan,
  gte: greaterThanOrEqual,
  in:  isIn,
  nin: isNotIn
};

