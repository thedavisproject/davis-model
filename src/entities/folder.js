const hierarchicalEntity = require('./hierarchicalEntity');
const deepFreeze = require('deep-freeze-strict');

const entityType = 'folder';

module.exports = {
  entityType,
  new: (id, name, props) => {
    const obj = Object.assign(
      {},
      hierarchicalEntity.new(entityType, id, name, props)
    );

    return deepFreeze(obj);
  }
};
