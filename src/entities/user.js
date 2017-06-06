const R = require('ramda');
const entity = require('./entity');
const bcrypt = require('bcrypt-nodejs');
const deepFreeze = require('deep-freeze-strict');

const entityType = 'user';

const setPassword = R.curry((plainTextPassword, user) => {
  const copy = Object.assign({}, user);
  copy.password = bcrypt.hashSync(plainTextPassword, bcrypt.genSaltSync(8));
  return deepFreeze(copy);
});

const comparePassword = R.curry((plainTextPassword, user) => {
  return bcrypt.compareSync(plainTextPassword, user.password);
});

module.exports = {
  entityType,
  setPassword,
  comparePassword,
  new: (id, name, email, props) => {
    const obj = Object.assign(
      {},
      entity.new(entityType, id, name),
      {
        email,
        admin: false
      },
      props);

    return deepFreeze(obj);
  }
};
