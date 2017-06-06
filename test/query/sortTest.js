const {expect} = require('chai');
const sort = require('../../src/query/sort');

describe('Sort', function(){

  it('should build proper ascending query', function(){
    expect(sort.ascending('foo')).to.deep.equal({
      property: 'foo',
      direction: sort.direction.ascending
    });
  });

  it('should build proper descending query', function(){
    expect(sort.descending('foo')).to.deep.equal({
      property: 'foo',
      direction: sort.direction.descending
    });
  });
});
