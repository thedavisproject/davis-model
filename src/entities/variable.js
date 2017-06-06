const entity = require('./entity');
const R = require('ramda');
const deepFreeze = require('deep-freeze-strict');

const entityType = 'variable';

const types = {
  categorical: 1,
  quantitative: 2
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

const newQuantitative = (id, name, props) => {
  return variable(id, name, types.quantitative, props);
};

module.exports = {
  entityType,
  types,
  fromTypeId,
  newCategorical,
  newQuantitative
};
