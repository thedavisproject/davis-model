const entity = require('./entity');
const deepFreeze = require('deep-freeze-strict');

const entityType = 'action';

const actions = {
  entity: {
    create: 'CREATE',
    update: 'UPDATE',
    delete: 'DELETE'
  },
  publish: {
    full: 'PUBLISH-FULL'
  }
};

const create = (id, name, user, subjectType, subjectId, action, props = {}) => {

  const obj = Object.assign(
    {},
    entity.new(entityType, id, name), // We don't need a name, but entities require it
    {
      user,
      subjectType,
      subjectId,
      action
    },
    props);

  return deepFreeze(obj);
};

const entityEntry = action => (user, entity) =>
  create(null, '', user, entity.entityType, entity.id, action);

module.exports = {
  entityType,
  new: create,
  entityCreatedEntry: entityEntry(actions.entity.create),
  entityUpdatedEntry: entityEntry(actions.entity.update),
  entityDeletedEntry: (user, entityType, entityId) =>
    create(null, '', user, entityType, entityId, actions.entity.delete),
  fullPublishEntry: user =>
    create(null, '', user, 'full', 0, actions.publish.full),
  actions
};
