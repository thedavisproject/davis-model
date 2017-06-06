const {expect} = require('chai');
const {assertIsEntity} = require('./entityTest');
const {assertIsHierarchical} = require('./hierarchicalEntityTest');
const attribute = require('../../src/entities/attribute');
const {assertIsImmutable} = require('davis-shared').test;

describe('Attribute', function() {

  const obj = attribute.new(123, 'Foo', 25),
    objWithKey = attribute.new(321, 'ooF', 25, { key: 'baz' });

  it('should be an entity of type "Attribute"', function() {
    assertIsEntity('attribute', 123, 'Foo', obj);
  });

  it('should be a hierarchy object', function(){
    assertIsHierarchical(obj);
  });

  it('should set variable', function(){
    expect(obj.variable).to.equal(25);
  });

  it('should initialize the key to the name', function(){
    expect(obj.key).to.equal('Foo');
  });

  it('shouldnt initialize the key to the name if prop is passed', function(){
    expect(objWithKey.key).to.equal('baz');
  });

  it('saves extra properties', function(){
    expect(attribute.new(123, 'Foo', 25, { p1: 'Baz' })).to.have.property('p1').and.equal('Baz');
  });

  it('should be immutable', function(){
    assertIsImmutable(obj);
  });
});
