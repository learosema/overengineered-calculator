import { lexer, Token, TokenType } from './lexer';
import { interpreter } from './interpreter';

describe('Interpreter', () => {
  it('should be able to interprete simple expressions', () => {
    const tokens: Array<Token> = [
      { type: TokenType.NumericValue, value: '123' },
      { type: TokenType.Operator, value: '+' },
      { type: TokenType.NumericValue, value: '45' },
    ];
    expect(interpreter(tokens)).toEqual('168');
  });

  it('should be able to handle multiplications in the correct order', () => {
    const tokens: Array<Token> = [
      { type: TokenType.NumericValue, value: '12' },
      { type: TokenType.Operator, value: '+' },
      { type: TokenType.NumericValue, value: '2' },
      { type: TokenType.Operator, value: '*' },
      { type: TokenType.NumericValue, value: '6' },
    ];
    expect(interpreter(tokens)).toEqual('24');
  });
});
