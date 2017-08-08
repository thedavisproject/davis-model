const {expect} = require('chai');
const {assertIsEntity} = require('./entityTest');
const variable = require('../../src/entities/variable');
const {assertIsImmutable} = require('davis-shared').test;

describe('Variable', function() {

  describe('Categorical', function(){

    const categorical = variable.newCategorical(123, 'Cat'),
      categoricalWithProps = variable.newCategorical(321, 'taC', {
        scopedDataSet: 4,
        key: 'bar'
      });

    it('should be an entity of type "Variable"', function() {
      assertIsEntity('variable', 123, 'Cat', categorical);
    });

    it('should initialize the variable type to "categorical"', function() {
      expect(categorical.type).to.equal(variable.types.categorical);
    });

    it('should have an empty scoped data set', function(){
      expect(categorical.scopedDataSet).to.equal(null);
    });

    it('should initialize the key to the name', function(){
      expect(categorical.key).to.equal('Cat');
    });

    it('shouldnt override special props', function(){
      expect(categoricalWithProps.scopedDataSet).to.equal(4);
      expect(categoricalWithProps.key).to.equal('bar');
    });

    it('saves extra properties', function(){
      expect(variable.newCategorical(123, 'Foo', { p1: 'Baz' })).to.have.property('p1').and.equal('Baz');
    });

    it('should be immutable', function(){
      assertIsImmutable(categorical);
    });

  });

  describe('Numerical', function(){

    const numerical = variable.newNumerical(123, 'Num'),
      numericalWithProps = variable.newNumerical(321, 'muN', {
        scopedDataSet: 5,
        key: 'baz'
      });

    it('should be an entity of type "Variable"', function() {
      assertIsEntity('variable', 123, 'Num', numerical);
    });

    it('should initialize the variable type to "numerical"', function() {
      expect(numerical.type).to.equal(variable.types.numerical);
    });

    it('shouldnt override special props', function(){
      expect(numericalWithProps.scopedDataSet).to.equal(5);
      expect(numericalWithProps.key).to.equal('baz');
    });

    it('saves extra properties', function(){
      expect(variable.newNumerical(123, 'Foo', { p1: 'Baz' }))
        .to.have.property('p1').and.equal('Baz');
    });

    it('should init format to null', function(){
      expect(variable.newNumerical(123, 'Foo'))
        .to.have.property('format').and.to.be.null;
    });

    it('should be immutable', function(){
      assertIsImmutable(numerical);
    });

  });

  describe('Text', function(){

    const textVar = variable.newText(123, 'Text'),
      textVarWithProps = variable.newText(321, 'txeT', {
        scopedDataSet: 5,
        key: 'baz'
      });

    it('should be an entity of type "Variable"', function() {
      assertIsEntity('variable', 123, 'Text', textVar);
    });

    it('should initialize the variable type to "text"', function() {
      expect(textVar.type).to.equal(variable.types.text);
    });

    it('shouldnt override special props', function(){
      expect(textVarWithProps.scopedDataSet).to.equal(5);
      expect(textVarWithProps.key).to.equal('baz');
    });

    it('saves extra properties', function(){
      expect(variable.newText(123, 'Foo', { p1: 'Baz' }))
        .to.have.property('p1').and.equal('Baz');
    });

    it('should init format to null', function(){
      expect(variable.newText(123, 'Foo'))
        .to.have.property('format').and.to.be.null;
    });

    it('should be immutable', function(){
      assertIsImmutable(textVar);
    });

  });

});
