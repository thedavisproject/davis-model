const {expect} = require('chai');
const entity = require('../../src/entities/entity');
const {assertIsImmutable} = require('davis-shared').test;

function assertIsEntity(entityType, id, name, obj) {
  expect(obj.entityType).to.equal(entityType);
  expect(obj.id).to.equal(id);
  expect(obj.name).to.equal(name);
}

exports.assertIsEntity = assertIsEntity;

describe('Entity', function() {

  const obj = entity.new('TestType', 123, 'Name');
  assertIsEntity('TestType', 123, 'Name', obj);

  const obj1 = entity.new('Type A', 5, 'Name 1'),
    obj2 = entity.new('Type A', 5, 'Name 2'),
    obj3 = entity.new('Type B', 5, 'Name 3'),
    obj4 = entity.new('Type A', 6, 'Name 4');

  it('should be equal for 2 entities with same type and id', function() {
    expect(entity.equals(obj1, obj2)).to.be.true;
  });

  it('should not be equal for 2 entities with different type and same id', function() {
    expect(entity.equals(obj1, obj3)).to.be.false;
  });

  it('should not be equal for 2 entities with same type and different id', function(){
    expect(entity.equals(obj1, obj4)).to.be.false;
  });

  it('should set the __type property', function(){
    expect(obj1.__type).to.deep.equal(['entity/Type A', 'entity']);
  });

  it('saves extra properties', function(){
    const e = entity.new('Type', 4, 'Foo', { p1: 'Baz' });
    expect(e).to.have.property('p1').and.equal('Baz');
  });

  it('sets the created date', function(){
    const result = entity.setCreated(new Date(2016,5,24,12,30,0,0), obj);
    expect(result.created.getTime()).to.equal((new Date(2016,5,24,12,30,0,0)).getTime());
  });

  it('does not mutate when setting the created date', function(){
    const result = entity.setCreated(new Date(2016,5,24,12,30,0,0), obj);
    expect(result).to.not.equal(obj);
  });

  it('copy returned from setting created date should be immutable', function(){
    const result = entity.setCreated(new Date(2016,5,24,12,30,0,0), obj);
    assertIsImmutable(result);
  });

  it('sets the modified date', function(){
    const result = entity.setModified(new Date(2017,5,24,12,30,0,0), obj);
    expect(result.modified.getTime()).to.equal((new Date(2017,5,24,12,30,0,0)).getTime());
  });

  it('does not mutate when setting the modified date', function(){
    const result = entity.setModified(new Date(2017,5,24,12,30,0,0), obj);
    expect(result).to.not.equal(obj);
  });

  it('copy returned from setting modified date should be immutable', function(){
    const result = entity.setModified(new Date(2016,5,24,12,30,0,0), obj);
    assertIsImmutable(result);
  });

  it('should be immutable', function(){
    assertIsImmutable(obj);
  });
});
