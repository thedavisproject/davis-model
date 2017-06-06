const R = require('ramda');
const entity = require('./entity');
const deepFreeze = require('deep-freeze-strict'); 

const entityType = 'dataset';

const setDataModified = R.curry((date, ds) => {
  const copy = Object.assign({}, ds);
  copy.dataModified = new Date(date);
  return deepFreeze(copy);
});

module.exports = {
  entityType,
  setDataModified,
  new: (id, name, props) => {
    const obj = Object.assign(
      {},
      entity.new(entityType, id, name),
      {
        folder: null,
        schema: null
      },
      props);

    return deepFreeze(obj);
  }
};
