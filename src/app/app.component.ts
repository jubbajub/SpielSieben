import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentNumber: number = 1;
  message: string = '';
  gameOver: boolean = false;
  selectedNumber: number | null = null;

  checkResponse(response: string) {
    if (this.selectedNumber === null) return;

    const isDivisibleBySelectedNumber = this.currentNumber % this.selectedNumber === 0;
    const sumOfDigitsIsSelectedNumber = this.sumOfDigits(this.currentNumber) === this.selectedNumber;
    const containsDigitSelectedNumber = this.currentNumber.toString().includes(this.selectedNumber.toString());

    const isValid = isDivisibleBySelectedNumber || sumOfDigitsIsSelectedNumber || containsDigitSelectedNumber;

    if ((isValid && response === 'Piep') || (!isValid && response === this.currentNumber.toString())) {
      this.message = 'Richtig!';
      this.currentNumber++;
      if (this.currentNumber > 100) {
        this.gameOver = true;
        this.message = 'Herzlichen GlÃ¼ckwunsch! Du hast das Spiel beendet.';
      }
    } else {
      this.message = 'Falsch. Versuch es erneut.';
    }
  }

  sumOfDigits(num: number): number {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }

  resetGame() {
    this.currentNumber = 1;
    this.message = '';
    this.gameOver = false;
    this.selectedNumber = null;
  }

  restartGame() {
    this.resetGame();
  }

  selectNumber(number: number) {
    this.selectedNumber = number;
  }
}
