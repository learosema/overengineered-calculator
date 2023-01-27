export enum TokenType {
  NumericValue,
  Operator,
}

export interface Token {
  type: TokenType;
  value: string;
}

export function lexer(expression: string): Token[] {
  const tokens: Array<Token> = [];
  expression = (expression || '').replace(/\s/g, '');
  let currentTerm = '';
  for (let idx = 0; idx < expression.length; idx++) {
    if (
      /[\d\.]/.test(expression[idx]) ||
      (currentTerm === '' && expression[idx] === '-')
    ) {
      currentTerm += expression[idx];
      continue;
    }
    if (/[+\-*\/]/.test(expression[idx])) {
      tokens.push({ type: TokenType.NumericValue, value: currentTerm });
      tokens.push({ type: TokenType.Operator, value: expression[idx] });
      currentTerm = '';
      continue;
    }
  }
  if (currentTerm !== '') {
    tokens.push({ type: TokenType.NumericValue, value: currentTerm });
  }
  return tokens;
}
