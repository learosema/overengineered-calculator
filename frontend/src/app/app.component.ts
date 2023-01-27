import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalulateService } from './calulate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  last = '0';
  lastOp = '';
  display = '0';
  isResult = true;

  _subscriptions = new Subscription();
  constructor(private calculateService: CalulateService) {}

  ngOnDestroy(): void {
      this._subscriptions.unsubscribe();
  }

  onPressKey(char: string) {
    if (this.isResult) {
      this.display = char;
      this.isResult = false;
      return;
    }
    this.display += char;
  }

  onPressClear() {
    this.display = '0';
    this.isResult = true;
  }

  onEval() {
    this._subscriptions.add(this.calculateService.eval(this.display).subscribe(calcResult => {
      this.display = calcResult.result.toString();
      this.isResult = true;
    }));
    this._subscriptions.add(this.calculateService.eval2().subscribe(result => console.log(result)))
  }
}
