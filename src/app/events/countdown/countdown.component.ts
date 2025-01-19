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
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent implements OnInit, AfterViewInit {
  @Input() targetDate: Date = new Date(2025, 5, 11); // Default value
  targetTime: number;
  currentTime: string;
  difference: number;

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
      this.tickTock();
      this.difference = this.targetTime - Date.now();
      this.difference = this.difference / (1000 * 60 * 60 * 24);

      if (!isNaN(this.days.nativeElement.innerText)) {
        this.days.nativeElement.innerText = Math.floor(this.difference);
      } else {
        this.days.nativeElement.innerHTML = `<img src="https://i.gifer.com/VAyR.gif" />`;
      }
    }, 1000);
  }

  tickTock() {
    const now = new Date();
    this.days.nativeElement.innerText = Math.floor(this.difference);
    this.hours.nativeElement.innerText = 23 - now.getHours();
    this.minutes.nativeElement.innerText = 60 - now.getMinutes();
    this.seconds.nativeElement.innerText = 60 - now.getSeconds();
  }

  private updateTargetDetails() {
    this.targetTime = this.targetDate.getTime();
    this.currentTime = `${
      this.months[this.targetDate.getMonth()]
    } ${this.targetDate.getDate()}, ${this.targetDate.getFullYear()}`;
  }
}
