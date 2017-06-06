const R = require('ramda');
const {number} = require('davis-shared');
const deepFreeze = require('deep-freeze-strict');

const isValidId = R.allPass([number.isInteger, R.gt(R.__, 0)]);

const isUnassigned = R.pipe(
  R.prop('id'),
  R.anyPass([R.isNil, R.equals(0)]));

const equals = R.curry((a, b) => {
  if(isUnassigned(a) || isUnassigned(b)){
    return false;
  }

  return a.id === b.id &&
    a.entityType === b.entityType;
});

const setCreated = R.curry((date, entity) => {
  const copy = Object.assign({}, entity);
  copy.created = new Date(date);
  return deepFreeze(copy);
});

const setModified = R.curry((date, entity) => {
  const copy = Object.assign({}, entity);
  copy.modified = new Date(date);
  return deepFreeze(copy);
});

module.exports = {
  isUnassigned,
  equals,
  isValidId,
  setCreated,
  setModified,
  new: (entityType, id, name, props) => {
    let obj = Object.assign(
      {},
      {
        __type: [`entity/${entityType}`, 'entity'],
        id: id,
        name: name,
        entityType: entityType
      },
      props || {});

    return deepFreeze(obj);
  }
};
