const {expect} = require('chai');
const {assertIsEntity} = require('./entityTest');
const dataSet = require('../../src/entities/dataSet');
const {assertIsImmutable} = require('davis-shared').test;

describe('Data Set', function() {

  const obj = dataSet.new(123, 'Set Name'),
    objWithProps = dataSet.new(123, 'Set Name', {
      folder: 45,
      schema: [1,2,3]
    });

  it('should be an entity of type "Data Set"', function() {
    assertIsEntity('dataset', 123, 'Set Name', obj);
  });

  it('should have an empty folder', function(){
    expect(obj.folder).to.equal(null);
  });

  it('should have an empty schema', function(){
    expect(obj.schema).to.equal(null);
  });

  it('shouldnt override special props', function(){
    expect(objWithProps.folder).to.equal(45);
    expect(objWithProps.schema).to.deep.equal([1,2,3]);
  });

  it('saves extra properties', function(){
    expect(dataSet.new(123, 'Foo', { p1: 'Baz' })).to.have.property('p1').and.equal('Baz');
  });

  it('sets the data modified date', function(){
    const result = dataSet.setDataModified(new Date(2016,5,24,12,30,0,0), obj);
    expect(result.dataModified.getTime()).to.equal((new Date(2016,5,24,12,30,0,0)).getTime());
  });

  it('does not mutate when setting the date', function(){
    const result = dataSet.setDataModified(new Date(2016,5,24,12,30,0,0), obj);
    expect(result).to.not.equal(obj);
  });

  it('copy returned from setting date should be immutable', function(){
    const result = dataSet.setDataModified(new Date(2016,5,24,12,30,0,0), obj);
    assertIsImmutable(result);
  });

  it('should be immutable', function(){
    assertIsImmutable(obj);
  });

  it('should allow for dictionary/map null prototype pattern in Schema', function(){
    const schema = Object.create(null);
    schema.foo = 'bar';

    const result = dataSet.new(123, 'Name', {
      schema
    });
    
    expect(result.schema).to.deep.equal(schema);
  });
});
