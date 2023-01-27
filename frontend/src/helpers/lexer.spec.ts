import { lexer, TokenType, Token } from './lexer';

describe('Lexer function', () => {
  it('should be able to parse numbers', () => {
    expect(lexer('123.45')).toEqual([
      { type: TokenType.NumericValue, value: '123.45' },
    ]);
  });

  it('should be able to tokenize simple maths', () => {
    expect(lexer('12 + 134')).toEqual([
      { type: TokenType.NumericValue, value: '12' },
      { type: TokenType.Operator, value: '+' },
      { type: TokenType.NumericValue, value: '134' },
    ]);
  });

  it('should be able to tokenize negative numbers', () => {
    expect(lexer('-123.45')).toEqual([
      { type: TokenType.NumericValue, value: '-123.45' },
    ]);
  });

  it('should be able to tokenize simple maths with negative numbers', () => {
    expect(lexer('-12 + -134')).toEqual([
      { type: TokenType.NumericValue, value: '-12' },
      { type: TokenType.Operator, value: '+' },
      { type: TokenType.NumericValue, value: '-134' },
    ]);
  });
});
