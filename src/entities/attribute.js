const hierarchicalEntity = require('./hierarchicalEntity');
const deepFreeze = require('deep-freeze-strict');

const entityType = 'attribute';

module.exports = {
  entityType,
  new: (id, name, variableId, props) => {
    const obj = Object.assign(
      {},
      hierarchicalEntity.new(entityType, id, name),
      {
        variable: variableId,
        key: name // Default to name (this can be overridden)
      },
      props);

    return deepFreeze(obj);
  }
};
