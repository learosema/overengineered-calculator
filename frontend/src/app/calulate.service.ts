import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';

export interface CalculateResult {
  result: number;
}

interface Term {
  number: string;
  op?: string;
}

export type OperatorFunction = (
  a: number,
  b: number
) => Observable<CalculateResult>;

export interface ICalculateService {
  add: OperatorFunction;
  sub: OperatorFunction;
  mul: OperatorFunction;
  div: OperatorFunction;
}

@Injectable({
  providedIn: 'root',
})
export class CalulateService implements ICalculateService {
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
}
