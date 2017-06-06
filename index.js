module.exports = {
  attribute:   require('./src/entities/attribute'),
  dataSet:     require('./src/entities/dataSet'),
  entity:      require('./src/entities/entity'),
  fact:        require('./src/data/fact'),
  folder:      require('./src/entities/folder'),
  individual:  require('./src/data/individual'),
  user:        require('./src/entities/user'),
  variable:    require('./src/entities/variable'),
  action:      require('./src/entities/actionLogEntry'),
  entityTypes: require('./src/entities/entityTypes'),
  query:       {
    build:     require('./src/query/build'),
    operators: require('./src/query/operators'),
    parse:     require('./src/query/parse'),
    validate:  require('./src/query/validate'),
    sort:      require('./src/query/sort')
  }
};
