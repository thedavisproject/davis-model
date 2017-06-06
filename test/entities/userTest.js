const {expect} = require('chai');
const {assertIsEntity} = require('./entityTest');
const user = require('../../src/entities/user');
const {assertIsImmutable} = require('davis-shared').test;

describe('User', function() {

  const obj = user.new(12, 'User Name', 'email@example.com'),
    objWithProps = user.new(21, 'Name', 'email', {
      admin: true
    });

  it('should be an entity of type "User"', function() {
    assertIsEntity('user', 12, 'User Name', obj);
  });

  it('should set the email', function(){
    expect(obj.email).to.equal('email@example.com');
  });

  it('should initialize "admin" to false', function(){
    expect(obj.admin).to.be.false;
  });

  it('should salt the password', function(){
    const result = user.setPassword('myPassword123', obj);
    expect(result.password).to.not.equal('myPassword123');
  });

  it('should not mutate the user when setting the password', function(){
    const result = user.setPassword('myPassword123', obj);
    expect(result).to.not.equal(obj);
  });

  it('copy returned from setting password should be immutable', function(){
    const result = user.setPassword('myPassword123', obj);
    assertIsImmutable(result);
  });

  it('should compare the password successfully', function(){
    const result = user.setPassword('myPassword123', obj);
    expect(user.comparePassword('myPassword123', result)).to.be.true;
    expect(user.comparePassword('somethingElse', result)).to.be.false;
  });

  it('shouldnt override special props', function(){
    expect(objWithProps.admin).to.be.true;
  });

  it('saves extra properties', function(){
    expect(user.new(123, 'Foo', 'Email', { p1: 'Baz' })).to.have.property('p1').and.equal('Baz');
  });

  it('should be immutable', function(){
    assertIsImmutable(obj);
  });
});
