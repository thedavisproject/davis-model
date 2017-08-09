const R = require('ramda');
const entity = require('./entity');
const deepFreeze = require('deep-freeze-strict');

const entityType = 'job';

const types = {
  import: 'IMPORT',
  publish: 'PUBLISH'
};

const statuses = {
  queued: 'QUEUED',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  fail: 'FAIL'
};

const setProgress = R.curry((progress, job) => {
  if(progress < 0 || progress > 1){
    throw 'Progress value must be in the range of 0-1';
  }
  return deepFreeze(R.assoc('progress', progress, job));
});

const setStatus = R.curry((status, job) => {
  if(!R.contains(status, R.values(statuses))){
    throw `Status ${status} is not in acceptable set: ${R.values(statuses).join(',')}`;
  }
  return deepFreeze(R.assoc('status', status, job));
});

const create = (id, name, type, props = {}) => {

  if(!R.contains(type, R.values(types))){
    throw `Type ${type} is not in acceptable set: ${R.values(types).join(',')}`;
  }

  const obj = Object.assign(
    {},
    entity.new(entityType, id, name), // We don't need a name, but entities require it
    {
      type,
      progress: 0, // 0 to 1
      status: statuses.queued
    },
    props);

  return deepFreeze(obj);
};

module.exports = {
  entityType,
  new: create,
  types,
  statuses,
  setProgress,
  setStatus
};
