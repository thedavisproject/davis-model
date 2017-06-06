const entity = require('./entity');
const deepFreeze = require('deep-freeze-strict');

module.exports = {
  new: (entityType, id, name, props) => {
    const obj = Object.assign(
      {},
      entity.new(entityType, id, name),
      {
        parent: null,
        hierarchical: true
      },
      props);

    return deepFreeze(obj);
  }
};
