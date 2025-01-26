import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, AfterViewInit {
  @Input() targetDate: Date = new Date(2025, 5, 11); // Default value
  targetTime: number;
  currentTime: string;
  difference: number;

  statusMessage: string = '';

  months: Array<string> = [
    'Ianuarie',
    'Februarie',
    'Martie',
    'Aprilie',
    'Mai',
    'Iunie',
    'Iulie',
    'August',
    'Septembrie',
    'Octombrie',
    'Noiembrie',
    'Decembrie',
  ];

  @ViewChild('days', { static: true }) days: ElementRef;
  @ViewChild('hours', { static: true }) hours: ElementRef;
  @ViewChild('minutes', { static: true }) minutes: ElementRef;
  @ViewChild('seconds', { static: true }) seconds: ElementRef;

  ngOnInit() {
    this.updateTargetDetails();
  }

  ngAfterViewInit() {
    setInterval(() => {
      const now = new Date().getTime();
      const tenHoursInMillis = 10 * 60 * 60 * 1000;

      if (now >= this.targetTime && now <= this.targetTime + tenHoursInMillis) {
        this.statusMessage = 'Evenimentul are loc chiar acum!';
        this.updateCountdown(0, 0, 0, 0);
      } else if (now > this.targetTime + tenHoursInMillis) {
        this.statusMessage = 'Evenimentul a luat sfârșit!';
        this.updateCountdown(0, 0, 0, 0);
      } else {
        this.statusMessage = '';
        this.difference = this.targetTime - now;
        this.calculateAndDisplayTime(this.difference);
      }
    }, 1000);
  }

  private calculateAndDisplayTime(difference: number) {
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    this.days.nativeElement.innerHTML = `<img src="https://i.gifer.com/VAyR.gif" />`;

    this.updateCountdown(days, hours, minutes, seconds);
  }

  private updateCountdown(
    days: number,
    hours: number,
    minutes: number,
    seconds: number
  ) {
    this.days.nativeElement.innerText = days;
    this.hours.nativeElement.innerText = hours;
    this.minutes.nativeElement.innerText = minutes;
    this.seconds.nativeElement.innerText = seconds;
  }

  private updateTargetDetails() {
    this.targetTime = this.targetDate.getTime();
    this.currentTime = `${
      this.months[this.targetDate.getMonth()]
    } ${this.targetDate.getDate()}, ${this.targetDate.getFullYear()}`;
  }
}
