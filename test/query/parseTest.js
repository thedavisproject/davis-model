const {expect} = require('chai');
const R = require('ramda');
const parse = require('../../src/query/parse');
const operators = R.indexBy(R.prop('symbol'), require('../../src/query/operators'));

describe('Parse Operator', function(){

  it('should parse the operator', function(){
    expect(parse.parseOperator(['=', 'foo', 2])).to.deep.equal(operators['=']);
    // Alias
    expect(parse.op(['and', 'foo', 2])).to.deep.equal(operators['and']);
  });

});

describe('Parse Property Name', function(){

  it('should parse the property name', function(){
    expect(parse.parsePropertyName(['>', 'foo', 5])).to.equal('foo');
    // Alias
    expect(parse.prop(['in', 'bar', [5,4,6]])).to.equal('bar');
  });

  it('should throw for non-comparison expression', function(){
    expect(() => parse.prop(['and', [], []])).to.throw(/Error parsing expression/);
  });

});
