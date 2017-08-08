const {expect} = require('chai');
const fact = require('../../src/data/fact');
const variable = require('../../src/entities/variable');

describe('Fact', function() {

  describe('Categorical', function(){
    const categorical = fact.newCategorical(1, 5);

    it('should initialize the type to "categorical"', function() {
      expect(categorical.type).to.equal(variable.types.categorical);
    });

    it('should initialize variable', function() {
      expect(categorical.variable).to.equal(1);
    });

    it('should initialize attribute', function() {
      expect(categorical.attribute).to.equal(5);
    });
  });

  describe('Numerical', function(){
    const numerical = fact.newNumerical(10, 55.8);

    it('should initialize the type to "numerical"', function() {
      expect(numerical.type).to.equal(variable.types.numerical);
    });

    it('should initialize variable', function() {
      expect(numerical.variable).to.equal(10);
    });

    it('should initialize value', function() {
      expect(numerical.value).to.equal(55.8);
    });

    it('should coerce to a number', function() {
      const num = fact.newNumerical(10, '45.1');
      expect(num.value).to.equal(45.1);
    });

    it('should save null for any nil', function() {
      const t1 = fact.newNumerical(10, undefined);
      expect(t1.value).to.equal(null);
      const t2 = fact.newNumerical(10, null);
      expect(t2.value).to.equal(null);
    });
  });

  describe('Text', function(){
    const text = fact.newText(10, 'abcdef');

    it('should initialize the type to "text"', function() {
      expect(text.type).to.equal(variable.types.text);
    });

    it('should initialize variable', function() {
      expect(text.variable).to.equal(10);
    });

    it('should initialize value', function() {
      expect(text.value).to.equal('abcdef');
    });

    it('should coerce to a string', function() {
      const t = fact.newText(10, 45.1);
      expect(t.value).to.equal('45.1');
    });

    it('should save null for any nil', function() {
      const t1 = fact.newText(10, undefined);
      expect(t1.value).to.equal(null);
      const t2 = fact.newText(10, null);
      expect(t2.value).to.equal(null);
    });
  });
});
