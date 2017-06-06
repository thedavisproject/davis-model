const {expect} = require('chai');
const {assertIsEntity} = require('./entityTest');
const hEntity = require('../../src/entities/hierarchicalEntity');
const {assertIsImmutable} = require('davis-shared').test;

function _assertIsHierarchical(obj){
  expect(obj.parent).to.equal(null);
  expect(obj.hierarchical).to.be.true;
}

exports.assertIsHierarchical = _assertIsHierarchical;

describe('Hierarchical Entity', function(){

  const obj = hEntity.new('Any Type', 123, 'My Name'),
    objWithProps = hEntity.new('Any Type', 321, 'Name', {
      parent: 56
    });

  it('should set the type', function() {
    assertIsEntity('Any Type', 123, 'My Name', obj);
  });

  it('should be hierarchical', function(){
    _assertIsHierarchical(obj);
  });

  it('should have empty parent', function(){
    expect(obj.parent).to.be.null;
  });

  it('shouldnt override special props', function(){
    expect(objWithProps.parent).to.equal(56);
  });

  it('saves extra properties', function(){
    expect(hEntity.new('Type', 123, 'Foo', { p1: 'Baz' })).to.have.property('p1').and.equal('Baz');
  });

  it('should be immutable', function(){
    assertIsImmutable(obj);
  });
});
