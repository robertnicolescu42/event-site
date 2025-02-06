import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { EventService, Event } from '../../core/event.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../contact/contact.component';
import { CountdownComponent } from '../countdown/countdown.component';
import { BehaviorSubject } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeRo from '@angular/common/locales/ro';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SimplePosterComponent } from '../simple-poster/simple-poster.component';

registerLocaleData(localeRo);

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    ContactComponent,
    CountdownComponent,
    MatProgressSpinnerModule,
    SimplePosterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  providers: [{ provide: LOCALE_ID, useValue: 'ro-RO' }],
})
export class HomeComponent implements OnInit {
  // TODO: Fix initial loading
  city: string = '';
  event$: BehaviorSubject<Event>;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {
    this.event$ = new BehaviorSubject<Event | null>(null);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.city = params.get('city')!;
      console.log('City:', this.city);

      // if (this.city === 'bucuresti') {
      //   // this.event = this.eventService.getBucurestiEvent();
      // } else {
      this.router.navigate(['/home/pitesti']);
      // this.event = this.eventService.getPitestiEvent();
      this.eventService.getPitestiEvent().subscribe((event) => {
        this.event$.next(event);
        this.loading$.next(false);
      });
      // }
    });
  }
}
