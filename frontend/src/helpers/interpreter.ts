import { Observable, of } from 'rxjs';
import { CalculateResult } from 'src/app/calulate.service';
import { Token, TokenType } from './lexer';

export type OperatorFunction = (
  a: number,
  b: number
) => Observable<CalculateResult>;

export interface Operations {
  plus: OperatorFunction;
  minus: OperatorFunction;
  mul: OperatorFunction;
  div: OperatorFunction;
}

export function interpreter(tokens: Array<Token>): string {
  const stack: Array<number> = [];
  let lastOp = '';
  for (const token of tokens) {
    if (token.type === TokenType.NumericValue) {
      if (lastOp === '' || lastOp === '+') {
        stack.push(parseFloat(token.value));
      }
      if (lastOp === '-') {
        stack.push(-parseFloat(token.value));
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
      }
    }
    if (token.type === TokenType.Operator) {
      lastOp = token.value;
    }
  }
  const result = stack.reduce((a, b) => a + b, 0);
  return result.toString();
}
