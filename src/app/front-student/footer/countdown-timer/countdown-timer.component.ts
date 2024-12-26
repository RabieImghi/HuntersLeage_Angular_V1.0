import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
interface TimerItem {
  label: string;
  value: number;
}
@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown-timer.component.html'
})
export class CountdownTimerComponent {

  timeLeft: TimeLeft = {
    days: 15,
    hours: 13,
    minutes: 6,
    seconds: 14
  };
  timerItems: TimerItem[] = [
    { label: 'Days', value: this.timeLeft.days },
    { label: 'Hours', value: this.timeLeft.hours },
    { label: 'Minutes', value: this.timeLeft.minutes },
    { label: 'Seconds', value: this.timeLeft.seconds }
  ];
  private timerInterval: any;

  ngOnInit(): void {
    this.timerInterval = setInterval(() => {
      this.updateTimeLeft();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
  private updateTimeLeft(): void {
    const { days, hours, minutes, seconds } = this.timeLeft;

    if (seconds > 0) {
      this.timeLeft.seconds--;
    } else if (minutes > 0) {
      this.timeLeft.minutes--;
      this.timeLeft.seconds = 59;
    } else if (hours > 0) {
      this.timeLeft.hours--;
      this.timeLeft.minutes = 59;
      this.timeLeft.seconds = 59;
    } else if (days > 0) {
      this.timeLeft.days--;
      this.timeLeft.hours = 23;
      this.timeLeft.minutes = 59;
      this.timeLeft.seconds = 59;
    }
    this.updateTimerItems();
  }
  private updateTimerItems(): void {
    this.timerItems = [
      { label: 'Days', value: this.timeLeft.days },
      { label: 'Hours', value: this.timeLeft.hours },
      { label: 'Minutes', value: this.timeLeft.minutes },
      { label: 'Seconds', value: this.timeLeft.seconds }
    ];
  }
}
