import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { interpreter } from 'src/helpers/interpreter';
import { lexer } from 'src/helpers/lexer';
import { CalulateService } from './calulate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  last = '0';
  lastOp = '';
  isResult = true;

  form = new FormGroup({
    display: new FormControl<string | null>('0', { nonNullable: false }),
  });

  _subscriptions = new Subscription();
  constructor(private calculateService: CalulateService) {}

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  onPressKey(char: string) {
    if (this.isResult) {
      this.form.controls.display.setValue(char);
      this.isResult = false;
      return;
    }
    this.form.controls.display.setValue(
      `${this.form.controls.display.value || ''}${char}`
    );
  }

  onPressClear() {
    this.form.controls.display.setValue('0');
    this.isResult = true;
  }

  onEval() {
    /* this._subscriptions.add(
      this.calculateService.eval(this.display || '').subscribe((calcResult) => {
        this.display = calcResult.result.toString();
        this.isResult = true;
      })
    ); */

    const tokens = lexer(this.form.controls.display.value || '');
    this.form.controls.display.setValue(interpreter(tokens));
    this.isResult = true;
  }
}
