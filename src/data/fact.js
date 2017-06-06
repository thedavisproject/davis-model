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

  newQuantitative: (variable, value) => {
    return {
      variable: variable,
      type: variables.types.quantitative,
      value: R.isNil(value)? null : parseFloat(value)
    };
  }
};
