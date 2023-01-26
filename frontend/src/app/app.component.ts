import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  last = '0';
  lastOp = '';
  display = '0';

  onPressDigit(char: string) {
    if (this.display === '0') {
      this.display = char;
      return;
    }
    this.display += char;
  }

  onPressClear() {
    this.display = '0';
  }

  onAdd() {
    this.last = this.display;
    this.display = '';
    this.lastOp = 'add';
  }
}
