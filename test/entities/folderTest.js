const {expect} = require('chai');
const {assertIsEntity} = require('./entityTest');
const {assertIsHierarchical} = require('./hierarchicalEntityTest');
const folder = require('../../src/entities/folder');
const {assertIsImmutable} = require('davis-shared').test;

describe('Folder', function(){

  const obj = folder.new(123, 'Folder Name');

  it('should be an entity of type "Folder"', function() {
    assertIsEntity('folder', 123, 'Folder Name', obj);
  });

  it('should be hierarchical', function(){
    assertIsHierarchical(obj);
  });

  it('saves extra properties', function(){
    expect(folder.new(123, 'Foo', { p1: 'Baz' })).to.have.property('p1').and.equal('Baz');
  });

  it('should be immutable', function(){
    assertIsImmutable(obj);
  });
});
