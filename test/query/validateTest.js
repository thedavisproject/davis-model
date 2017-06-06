const {expect} = require('chai');
const validate = require('../../src/query/validate');

describe('Query Validation', function(){

  it('should validate no operator', function(){
    const result = validate([]);
    expect(result.isLeft).to.be.true;
    expect(result.merge()).to.equal('Expression has no operator in the first position');
  });

  it('should validate bad operators', function(){

    const someInvalidOperators = ['equals', 'foo', '&&', '', null, undefined];

    someInvalidOperators.forEach(function(op){
      const result = validate([op]);
      expect(result.isLeft).to.be.true;
      expect(result.merge()).to.equal(`Operator is invalid: ${op}`);
    });
  });

  it('should validate operator arity', function(){

    const expect2 = op => {
      [
        validate([op, 'foo']),
        validate([op, 'foo', 3, 4])
      ].forEach(result => {
        expect(result.isLeft).to.be.true;
        expect(result.merge()).to.equal('The argument list must be of length: 2');
      });
    };

    ['=', '!=', '<', '<=', '>', '>=', 'like', 'in', 'notin'].forEach(expect2);

    const expectAtLeast2 = op => {
      [
        validate([op, 'x'])
      ].forEach(result => {
        expect(result.isLeft).to.be.true;
        expect(result.merge()).to.equal('The argument list must be of length: >= 2');
      });
    };

    ['and', 'or', 'nor'].forEach(expectAtLeast2);

    const expect1 = op => {
      [
        validate([op, 'x', 'y']),
        validate([op, 'x', 'y', 'z'])
      ].forEach(result => {
        expect(result.isLeft).to.be.true;
        expect(result.merge()).to.equal('The argument list must be of length: 1');
      });
    };

    ['not'].forEach(expect1);
  });

  it('should validate the first comparison operator', function(){

    const expectStringInFirstPosition = op => {

      [
        validate([op, null, 1]),
        validate([op, 1, 1]),
        validate([op, [], 1]),
        validate([op, {}, 1])
      ].forEach(result => {
        expect(result.isLeft).to.be.true;
        expect(result.merge()).to.equal('Argument 0 must be a string');
      });
    };

    ['=', '!=', '<', '<=', '>', '>=', 'like', 'in', 'notin'].forEach(expectStringInFirstPosition);

  });

  it('should validate the second comparison argument where array is expected', function(){

    const expectArrayInFirstPosition = op => {

      [
        validate([op, 'foo', 1]),
        validate([op, 'foo', '1']),
        validate([op, 'foo', {}])
      ].forEach(result => {
        expect(result.isLeft).to.be.true;
        expect(result.merge()).to.equal('Argument 1 must be an Array');
      });
    };

    ['in', 'notin'].forEach(expectArrayInFirstPosition);

  });

  it('should validate all logical expressions have arrays (other expressions) for arguments', function(){

    const expectArrayInFirstPosition = op => {

      [
        validate([op, 1, 1]),
        validate([op, '1', '1']),
        validate([op, {}, {}])
      ].forEach(result => {
        expect(result.isLeft).to.be.true;
        expect(result.merge()).to.equal('Argument 0 must be an Array');
      });
    };

    ['and', 'or', 'nor'].forEach(expectArrayInFirstPosition);

    const expectArrayInSecondPosition = op => {

      [
        validate([op, [], 1]),
        validate([op, [], '1']),
        validate([op, [], {}])
      ].forEach(result => {
        expect(result.isLeft).to.be.true;
        expect(result.merge()).to.equal('Argument 1 must be an Array');
      });
    };

    ['and', 'or', 'nor'].forEach(expectArrayInSecondPosition);

    [
      validate(['not', 1]),
      validate(['not', '1']),
      validate(['not', {}])
    ].forEach(result => {
      expect(result.isLeft).to.be.true;
      expect(result.merge()).to.equal('Argument 0 must be an Array');
    });
  });

  it('should recursively validate logical expressions', function(){

    const badComplexExpression1 = ['and', ['=', 'foo', 2], ['bad', 'foo', 2]];
    const badComplexExpression2 = ['not', ['and', ['=', {}, 2], ['>', 'bar', 1]]];

    const result1 = validate(badComplexExpression1);
    const result2 = validate(badComplexExpression2);

    expect(result1.isLeft).to.be.true;
    expect(result1.merge()).to.equal('Operator is invalid: bad');

    expect(result2.isLeft).to.be.true;
    expect(result2.merge()).to.equal('Argument 0 must be a string');

    const goodComplexExpression =
      ['and',
        ['not',
          ['or',
            ['=', 'foo', 1],
            ['in', 'bar', [1,2,3]]
          ]
        ],
        ['nor',
          ['>', 'baz', 100],
          ['<', 'baz', 10]
        ]
      ];

    const result3 = validate(goodComplexExpression);

    expect(result3.isRight).to.be.true;
    expect(result3.get()).to.deep.equal(goodComplexExpression);
  });

});
