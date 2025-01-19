import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../../core/event.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../contact/contact.component';
import { CountdownComponent } from '../countdown/countdown.component';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    ContactComponent,
    CountdownComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent implements OnInit {
  city: string = '';
  event: Event;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    this.event = this.eventService.defaultEvent;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.city = params.get('city')!;
      console.log('City:', this.city);

      if (this.city === 'pitesti') {
        this.event = this.eventService.getPitestiEvent();
      } else if (this.city === 'bucuresti') {
        this.event = this.eventService.getBucurestiEvent();
      }
    });
  }
}
