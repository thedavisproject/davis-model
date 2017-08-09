const {expect} = require('chai');
const logEntry = require('../../src/entities/actionLogEntry');
const entity = require('../../src/entities/entity');
const {assertIsImmutable} = require('davis-shared').test;

describe('Log Entry', function() {

  const obj = logEntry.new(10, '', 345, 'subject-type', 'subject-id', 'action-name');

  it('should set the id', function() {
    expect(obj.id).to.equal(10);
  });

  it('should set the user id', function(){
    expect(obj.user).to.equal(345);
  });

  it('should set the subject type', function(){
    expect(obj.subjectType).to.equal('subject-type');
  });

  it('should set the subject id', function(){
    expect(obj.subjectId).to.equal('subject-id');
  });

  it('should set the action', function(){
    expect(obj.action).to.equal('action-name');
  });

  const testEntity = entity.new('test-type', 55, 'test-name');

  it('should build entity create log entry', function(){
    const entry = logEntry.entityCreatedEntry(100, testEntity);
    expect(entry.name).to.equal('');
    expect(entry.user).to.equal(100);
    expect(entry.subjectType).to.equal('test-type');
    expect(entry.subjectId).to.equal(55);
    expect(entry.action).to.equal('CREATE');
  });

  it('should build entity update log entry', function(){
    const entry = logEntry.entityUpdatedEntry(100, testEntity);
    expect(entry.name).to.equal('');
    expect(entry.user).to.equal(100);
    expect(entry.subjectType).to.equal('test-type');
    expect(entry.subjectId).to.equal(55);
    expect(entry.action).to.equal('UPDATE');
  });

  it('should build entity delete log entry', function(){
    const entry = logEntry.entityDeletedEntry(100, testEntity.entityType, testEntity.id);
    expect(entry.name).to.equal('');
    expect(entry.user).to.equal(100);
    expect(entry.subjectType).to.equal('test-type');
    expect(entry.subjectId).to.equal(55);
    expect(entry.action).to.equal('DELETE');
  });

  it('should build full publish log entry', function(){
    const entry = logEntry.fullPublishEntry(100);
    expect(entry.name).to.equal('');
    expect(entry.user).to.equal(100);
    expect(entry.subjectType).to.equal('full');
    expect(entry.subjectId).to.equal(0);
    expect(entry.action).to.equal('PUBLISH-FULL');
  });

  it('should be immutable', function(){
    assertIsImmutable(obj);
  });

});
