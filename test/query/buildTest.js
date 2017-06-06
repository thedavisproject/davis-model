const {expect} = require('chai');
const build = require('../../src/query/build');

describe('Query builder', function(){

  it('should properly build equals query', function(){
    expect(build.equals('foo', 2)).to.deep.equal(['=', 'foo', 2]);
    expect(build.eq('foo', 2)).to.deep.equal(['=', 'foo', 2]);
  });

  it('should properly build not equals query', function(){
    expect(build.notEquals('foo', 2)).to.deep.equal(['!=', 'foo', 2]);
    expect(build.neq('foo', 2)).to.deep.equal(['!=', 'foo', 2]);
  });

  it('should properly build lessThan query', function(){
    expect(build.lessThan('foo', 2)).to.deep.equal(['<', 'foo', 2]);
    expect(build.lt('foo', 2)).to.deep.equal(['<', 'foo', 2]);
  });

  it('should properly build lessThanOrEqual query', function(){
    expect(build.lessThanOrEqual('foo', 2)).to.deep.equal(['<=', 'foo', 2]);
    expect(build.lte('foo', 2)).to.deep.equal(['<=', 'foo', 2]);
  });

  it('should properly build greaterThan query', function(){
    expect(build.greaterThan('foo', 2)).to.deep.equal(['>', 'foo', 2]);
    expect(build.gt('foo', 2)).to.deep.equal(['>', 'foo', 2]);
  });

  it('should properly build greaterThanOrEqual query', function(){
    expect(build.greaterThanOrEqual('foo', 2)).to.deep.equal(['>=', 'foo', 2]);
    expect(build.gte('foo', 2)).to.deep.equal(['>=', 'foo', 2]);
  });

  it('should properly build like query', function(){
    expect(build.like('foo', '%25%')).to.deep.equal(['like', 'foo', '%25%']);
  });

  it('should properly build in query', function(){
    expect(build.isIn('foo', [1,2,3])).to.deep.equal(['in', 'foo', [1,2,3]]);
    expect(build.in('foo', [1,2,3])).to.deep.equal(['in', 'foo', [1,2,3]]);
  });

  it('should properly build not in query', function(){
    expect(build.isNotIn('foo', [1,2,3])).to.deep.equal(['notin', 'foo', [1,2,3]]);
    expect(build.nin('foo', [1,2,3])).to.deep.equal(['notin', 'foo', [1,2,3]]);
  });

  it('should properly build and query', function(){
    expect(build.and([],[])).to.deep.equal(['and', [], []]);
  });

  it('should properly build or query', function(){
    expect(build.or([],[])).to.deep.equal(['or', [], []]);
  });

  it('should properly build nor query', function(){
    expect(build.nor([],[])).to.deep.equal(['nor', [], []]);
  });

  it('should properly build not query', function(){
    expect(build.not([])).to.deep.equal(['not', []]);
  });

});
