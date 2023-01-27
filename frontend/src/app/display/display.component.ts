import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DisplayComponent),
      multi: true,
    },
  ],
})
export class DisplayComponent implements ControlValueAccessor {
  @Input()
  public disabled = false;

  public formValue = new FormControl('');

  public id = Math.random().toString(16).slice(1);

  private _touchedListeners: any[] = [];

  private _changedListeners: any[] = [];

  writeValue(value: string | null): void {
    this.formValue.setValue(value);
  }

  registerOnChange(fn: any): void {
    this._changedListeners.push(fn);
  }

  registerOnTouched(fn: any): void {
    this._touchedListeners.push(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleChange(event: Event) {
    for (const fun of this._changedListeners) {
      if (typeof fun === 'function') {
        fun(this.formValue.value);
      }
    }
  }

  handleBlur(event: Event) {
    for (const fun of this._touchedListeners) {
      if (typeof fun === 'function') {
        fun(this.formValue.value);
      }
    }
  }
}
