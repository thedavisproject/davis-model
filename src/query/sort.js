const R = require('ramda');

const direction = {
  ascending: 'ASC',
  descending: 'DESC'
};

const build = R.curry((direction, property) => ({
  property,
  direction
}));

const ascending = build(direction.ascending);
const descending = build(direction.descending);

module.exports = {
  ascending,
  descending,

  // Aliases
  asc: ascending,
  desc: descending,

  direction
};
