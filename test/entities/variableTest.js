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

  describe('Quantitiative', function(){

    const quantitative = variable.newQuantitative(123, 'Quant'),
      quantitativeWithProps = variable.newCategorical(321, 'tnauQ', {
        scopedDataSet: 5,
        key: 'baz'
      });

    it('should be an entity of type "Variable"', function() {
      assertIsEntity('variable', 123, 'Quant', quantitative);
    });

    it('should initialize the variable type to "quantitative"', function() {
      expect(quantitative.type).to.equal(variable.types.quantitative);
    });

    it('shouldnt override special props', function(){
      expect(quantitativeWithProps.scopedDataSet).to.equal(5);
      expect(quantitativeWithProps.key).to.equal('baz');
    });

    it('saves extra properties', function(){
      expect(variable.newQuantitative(123, 'Foo', { p1: 'Baz' }))
        .to.have.property('p1').and.equal('Baz');
    });

    it('should init format to null', function(){
      expect(variable.newQuantitative(123, 'Foo'))
        .to.have.property('format').and.to.be.null;
    });

    it('should be immutable', function(){
      assertIsImmutable(quantitative);
    });

  });

});
