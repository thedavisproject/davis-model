const R = require('ramda');
const Either = require('data.either');
const shared = require('davis-shared');
const { tryGet } = shared.general;
const { maybe2Either } = shared.fp;
const { thread } = shared.fp;
const ops = require('./operators');

const argCountIs = R.curry((checkCount, errorMessage, expression) =>
  checkCount(expression.length - 1) ? Either.Right(expression) : Either.Left(errorMessage));

const argCountMustEqual1 = argCountIs(R.equals(1), 'The argument list must be of length: 1');
const argCountMustEqual2 = argCountIs(R.equals(2), 'The argument list must be of length: 2');
const argCountMustBeAtLeast2 = argCountIs(R.gte(R.__, 2), 'The argument list must be of length: >= 2');

const argIsString = R.curry((index, expression) =>
  typeof(expression[index + 1]) === 'string' ? Either.Right(expression) : Either.Left(`Argument ${index} must be a string`));

const argIsArray = R.curry((index, expression) =>
  R.isArrayLike(expression[index + 1]) ? Either.Right(expression): Either.Left(`Argument ${index} must be an Array`));

const validateBinaryComparison = R.pipe(
  argCountMustEqual2,
  R.chain(argIsString(0)));

const argsAreAllArrays = expression => thread(
  expression,
  R.tail,
  args => args.reduce((result, arg, i) =>
    result.chain(() => argIsArray(i, expression)), Either.of(expression)));

const operators = R.indexBy(R.prop('symbol'), ops);

// Configure validation rules
operators['='].validate = validateBinaryComparison;
operators['!='].validate = validateBinaryComparison;
operators['<'].validate = validateBinaryComparison;
operators['<='].validate = validateBinaryComparison;
operators['>'].validate = validateBinaryComparison;
operators['>='].validate = validateBinaryComparison;
operators['like'].validate = validateBinaryComparison;

operators['in'].validate = R.pipe(
  validateBinaryComparison,
  R.chain(argIsArray(1)));

operators['notin'].validate = R.pipe(
  validateBinaryComparison,
  R.chain(argIsArray(1)));

operators['and'].validate = R.pipe(
  argCountMustBeAtLeast2,
  R.chain(argsAreAllArrays));

operators['or'].validate = R.pipe(
  argCountMustBeAtLeast2,
  R.chain(argsAreAllArrays));

operators['not'].validate = R.pipe(
  argCountMustEqual1,
  R.chain(argsAreAllArrays));

operators['nor'].validate = R.pipe(
  argCountMustBeAtLeast2,
  R.chain(argsAreAllArrays));

const validateExpression = expression => {
  const config = thread(
    tryGet(0, expression),
    maybe2Either('Expression has no operator in the first position'),
    R.chain(op => thread(
      tryGet(op, operators),
      maybe2Either(`Operator is invalid: ${op}`))));

  return config.chain(c =>
    c.validate(expression)
      .chain(() => c.type === 'logical' ?
        // If logical expression, recursively validate each branch, combine into
        // one Either
        R.traverse(
          Either.of,
          validateExpression,
          R.tail(expression)) :
        // If otherwise, do nothing
        Either.of(expression))
      // Clean up the Either.Right
      .map(() => expression));
};

module.exports = validateExpression;
