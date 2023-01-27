import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';

interface CalculateResult {
  result: number;
}

interface Term {
  number: string;
  op ?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalulateService {

  constructor(private _http: HttpClient) {}

  public add(a: number, b: number): Observable<CalculateResult> {
    return this._http.get<CalculateResult>(`/api/v1/add?a=${a}&b=${b}`);
  }

  public sub(a: number, b: number): Observable<CalculateResult> {
    return this._http.get<CalculateResult>(`/api/v1/sub?a=${a}&b=${b}`);
  }

  public mul(a: number, b: number): Observable<CalculateResult> {
    return this._http.get<CalculateResult>(`/api/v1/mul?a=${a}&b=${b}`);
  }

  public div(a: number, b: number): Observable<CalculateResult> {
    return this._http.get<CalculateResult>(`/api/v1/div?a=${a}&b=${b}`);
  }

  public eval2() {
    return this.add(1, 1).pipe(
      switchMap(calcResult => {
        return this.add(calcResult.result, 3);
      })
    );
  }


  public eval(expression: string): Observable<CalculateResult> {
    const operations: Array<Term> = [];
    let currentTerm = '';
    for (let idx = 0; idx < expression.length; idx++) {
      if (/[\d\.]/.test(expression[idx])) {
        currentTerm += expression[idx];
        continue;
      }
      if (expression[idx] === '+' || expression[idx] === '-') {
        if (currentTerm === '') {
          currentTerm += expression;
          continue;
        }
        operations.push({number: currentTerm, op: expression[idx]})
        currentTerm = '';
        continue;
      }
      if (expression[idx] === '*' || expression[idx] === '/') {
        if (currentTerm === '') {
          currentTerm = '0'
        }
        operations.push({number: currentTerm, op: expression[idx]});
        currentTerm = '';
      }
    }
    if (currentTerm !== '') {
      operations.push({number: currentTerm})
    }
    let result = 0;
    let lastOp = '';
    for (const operation of operations) {
      if (lastOp === '') {
        result = parseFloat(operation.number);
      }
      if (lastOp === '+') {
        result = result + parseFloat(operation.number);
      }
      if (lastOp === '-') {
        result = result - parseFloat(operation.number);
      }
      if (lastOp === '*') {
        result = result * parseFloat(operation.number);
      }
      if (lastOp === '/') {
        result = result / parseFloat(operation.number);
      }
      lastOp = operation.op || '';
    }
    return of({result});
  }
}
