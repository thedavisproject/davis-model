const entity = require('./entity');
const R = require('ramda');
const deepFreeze = require('deep-freeze-strict');

const entityType = 'variable';

const types = {
  categorical: 1,
  numerical: 2,
  text: 3
};

function variable(id, name, typeId, props){

  const obj = Object.assign(
    {},
    entity.new(entityType, id, name),
    {
      type: typeId,
      scopedDataSet: null,
      key: name,
      format: null
    }, props);

  return deepFreeze(obj);
}

const fromTypeId = id => R.invert(types)[id][0];

const newCategorical = (id, name, props) => {
  return variable(id, name, types.categorical, props);
};

const newNumerical = (id, name, props) => {
  return variable(id, name, types.numerical, props);
};

const newText = (id, name, props) => {
  return variable(id, name, types.text, props);
};

module.exports = {
  entityType,
  types,
  fromTypeId,
  new: variable,
  newCategorical,
  newNumerical,
  newText
};
