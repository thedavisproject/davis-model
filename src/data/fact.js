const variables = require('../entities/variable');
const R = require('ramda');

module.exports = {
  newCategorical: (variable, attribute) => {
    return {
      variable: variable,
      type: variables.types.categorical,
      attribute: attribute
    };
  },

  newNumerical: (variable, value) => {
    return {
      variable: variable,
      type: variables.types.numerical,
      value: R.isNil(value)? null : parseFloat(value)
    };
  },

  newText: (variable, value) => {
    return {
      variable: variable,
      type: variables.types.text,
      value: R.isNil(value)? null : value.toString()
    };
  }
};
