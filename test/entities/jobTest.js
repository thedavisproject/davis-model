const {expect} = require('chai');
const job = require('../../src/entities/job');
const {assertIsImmutable} = require('davis-shared').test;

describe('Job', function() {

  const obj = job.new(10, '', job.types.import);

  it('should set the id', function() {
    expect(obj.id).to.equal(10);
  });

  it('should set the type', function(){
    expect(obj.type).to.equal(job.types.import);
  });

  it('should initialize the progress', function(){
    expect(obj.progress).to.equal(0);
  });

  it('should initialize the status', function(){
    expect(obj.status).to.equal(job.statuses.queued);
  });

  it('should save the extra properties', function(){
    expect(job.new(123, 'Foo', job.types.import, { p1: 'Baz' })).to.have.property('p1').and.equal('Baz');
  });

  it('should check that type is valid', function(){
    expect(() => job.new(10, '', 'FOO')).to.throw(/Type FOO is not in acceptable set/);
  });
  
  it('should be immutable', function(){
    assertIsImmutable(obj);
  });

  describe('Set Progress', function(){

    it('should check that progress is between 0-1', function(){
      expect(() => job.setProgress(-0.5, obj)).to.throw(/Progress value must be in the range/);
      expect(() => job.setProgress(1.5, obj)).to.throw(/Progress value must be in the range/);
    });

    it('should set the progress', function(){
      expect(job.setProgress(0.5, obj).progress).to.equal(0.5);
    });

    it('should not mutate the job when setting the progress', function(){
      const result = job.setProgress(0.5, obj);
      expect(result).to.not.equal(obj);
    });
  });

  describe('Set Status', function(){

    it('should check that status is valid', function(){
      expect(() => job.setStatus('FOO', obj)).to.throw(/Status FOO is not in acceptable set/);
    });

    it('should set the status', function(){
      expect(job.setStatus(job.statuses.success, obj).status).to.equal(job.statuses.success);
    });

    it('should not mutate the job when setting the status', function(){
      const result = job.setStatus(job.statuses.success, obj);
      expect(result).to.not.equal(obj);
    });
  });

});
