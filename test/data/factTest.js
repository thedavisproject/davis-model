const {expect} = require('chai');
const fact = require('../../src/data/fact');
const variable = require('../../src/entities/variable');

describe('Fact', function() {

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

  const quantitative = fact.newQuantitative(10, 55.8);

  it('should initialize the type to "quantitative"', function() {
    expect(quantitative.type).to.equal(variable.types.quantitative);
  });

  it('should initialize variable', function() {
    expect(quantitative.variable).to.equal(10);
  });

  it('should initialize attribute', function() {
    expect(quantitative.value).to.equal(55.8);
  });
});
