import { Token, TokenType } from './lexer';

export function interpreter(tokens: Array<Token>): string {
  const stack: Array<number> = [];
  let lastOp = '';
  for (const token of tokens) {
    if (token.type === TokenType.NumericValue) {
      if (lastOp === '' || lastOp === '+') {
        stack.push(parseFloat(token.value));
        continue;
      }
      if (lastOp === '-') {
        stack.push(-parseFloat(token.value));
        continue;
      }
      if (lastOp === '*' || lastOp === '/') {
        const lastNum = stack.pop();
        if (!lastNum) {
          throw Error('Number expected');
        }
        const newNum =
          lastOp === '*'
            ? lastNum * parseFloat(token.value)
            : lastNum / parseFloat(token.value);
        stack.push(newNum);
        continue;
      }
      throw Error('Unknown operator');
    }
    if (token.type === TokenType.Operator) {
      lastOp = token.value;
    }
  }
  const result = stack.reduce((a, b) => a + b, 0);
  return result.toString();
}
